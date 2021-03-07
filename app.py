from flask import Flask,jsonify,request
import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# create an instance of the Flask class
app = Flask(__name__)

class Simulation:
    # Safeguard for getters to ensure the data being served is from a completed simulation
    SIM_RAN = False

    # @param N : Total population
    # @param I0 : Initial infected (absolute, not a %) (default 1)
    # @param R0 : Intial recovered/immunune (absolute, not a %) (default 0)
    # @param B : Additional infections per person per day (default subject to change?)
    # @param Y : Recovery rate, 1/Y = Recovery time (default 2 weeks)
    # @param D_r : Death rate (default 2%)
    # @param MW_C: Mask Compliance (% people who wear, default 80%)
    # @param vaccine_offset : The number of days before vaccine kicks in.
    #                         Set default to 7 months, ~ 217 days
    # @param vaccine_infect : The relative % chance of getting infected when vaccinated.
    #                         Set default to 0.08, vaccines are 92% effective
    def __init__(self, N:int, I0:int=1, R0:int=0, B:float=0.8, Y:float=1.0/14, D_r:float=0.02, MW_C:float=0.8, vaccine_offset:int=217, vaccine_infect:float=0.08):

        # I realize that these defaults are redundant because we can specify defaults in the API but whatevs :P

        self.N = N 
        self.I0 = I0
        self.R0 = R0
        self.S0 = N - I0 - R0 # Initial susceptible
        self.Y = Y 
        self.D_r = D_r

        # Assume masks reduce by 50% both ways?
        E_IN = 0.5
        E_OUT = 0.5

        # Eg. No masks would mean MASK_FACTOR = 1 (no change), everyone wearing 100% effective masks => MASK_FACTOR = 0 (zero transmission)
        MASK_FACTOR = (1-MW_C)**2 + E_OUT*MW_C*(1-MW_C) + E_IN*MW_C*(1-MW_C) + E_IN*E_OUT*MW_C**2;
        self.B = B*MASK_FACTOR

        self.vaccine_offset = vaccine_offset
        self.vaccine_infect = vaccine_infect

    # @param days: The number of days we're simulating
    # @return: Tuple (S,I,R,V) holding integer lists containing respective data
    def simulate(self,days : int):
        time = np.linspace(0,days,days)

        # An array that holds proportion of population vaccinated at times t
        self.V = np.ndarray(shape=(1,days),dtype=float,order='F')[0]

        # Fill in the array based on estimate functions, can be adjusted!
        for i in range(days):
            self.V[i] = 0 if i < self.vaccine_offset else (i-self.vaccine_offset)**0.75

        # ODE solvey-solve
        def derivative(y, t, N, beta, gamma, vax_inf):
            self.S, self.I, self.R = y
            # Prevents indexOutOfBoundsExecption, probly not best practice I know
            if int(t) >= days:
                t = days-1
            VAX_FACTOR = ((1-self.V[int(t)]/self.N)**2 + 2*self.V[int(t)]/self.N*(1-self.V[int(t)]/self.N)*vax_inf + (self.V[int(t)]/self.N)**2*vax_inf**2)
            beta *= VAX_FACTOR
            dSdt = -beta * self.S * self.I / N
            dIdt = beta * self.S * self.I / N - gamma * self.I
            dRdt = gamma * self.I
            return (dSdt, dIdt, dRdt)
        
        # Initial conditions vector
        y0 = (self.S0, self.I0, self.R0)

        # Integrate the SIR equations over the time grid
        ret = odeint(derivative, y0, time, args=(self.N, self.B, self.Y, self.vaccine_infect))
        self.S, self.I, self.R = ret.T

        # Convert some Recoveries to Deaths based on death rate, D_r
        self.D = [] # Init Death vector
        for i in range(days):
            self.D.append(self.R[i]*self.D_r)
            self.R[i] -= self.D[i]
            
        # Allow data to be served
        # I put this with the assertions in the getters for ease of debug, just in case yknow?
        self.SIM_RAN = True

        # No processing on D cuz it's already list of int
        return([round(x) for x in self.S],[round(x) for x in self.I],[round(x) for x in self.R],[round(x) for x in self.V],self.D)

    # -- Main Data Getters -- #

    # @return: List of integers representing the number of susceptible mans each day
    def get_S_Vector(self):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        return [round(x) for x in self.S]

    # @return: List of integers representing the number of infected (dutty) mans each day
    def get_I_Vector(self):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        return [round(x) for x in self.I]

    # @return: List of integers representing the number of recovered (beefy tings) mans each day
    def get_R_Vector(self):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        return [round(x) for x in self.R]

    # @return: List of integers representing the number of vaccinated (autistic) mans each day
    def get_V_Vector(self):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        return [round(x) for x in self.V]

    # @return: List of integers representing the number of DEAD MONS each day
    def get_D_Vector(self):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        return [round(x) for x in self.D]

    # @return: List of integers representing the number of DEAD MONS each day
    def get_Active_Cases(self, I_Vector):
        if not self.SIM_RAN:
            raise AssertionError("A simulation must be ran before we can pull data.")
        res = [0] + [I_Vector[i] - I_Vector[i-1] for i in range(1, len(I_Vector))]
        if len(res) != len(I_Vector):
            raise AssertionError("Active cases vector length != I_Vector length. Check get_Active_Cases()")
        return res

@app.route('/')
def beans():
    return "matt was here"

@app.route('/simulate/example')
def example_fetch():
    example = Simulation(1000) # Erryting default
    example.simulate(365) # Un ans
    json_dict = dict(name="infect_vector",size=365,data=example.get_I_Vector())
    return jsonify(json_dict)

# Eg. localhost:5000/simulate?pop=1000&i0=4&b=1.1&d_r=0.1&vax_offset=10&days=30
@app.route('/simulate')
def simulation_nation():
    pop = request.args.get('pop',type = int)# Cannot have default population, doesn't make sense
    i0 = request.args.get('i0',default=1,type = int)
    r0 = request.args.get('r0',default=0,type = int)
    b = request.args.get('beta',default=0.8,type = float) # Again, default TBD
    y = request.args.get('gamma',default=1.0/14,type = float)
    d_r = request.args.get('death_rate',default=0.02,type = float)
    mw_c = request.args.get('masks',default=0.8,type = float)
    vax_off = request.args.get('vax_offset',default=273,type = int)
    vax_inf = request.args.get('vax_infect',default=0.08,type = float)
    days = request.args.get('days',default=365,type = int)

    # If we're missing an essential param or it is invalid, return 400
    # Population is the only param without a default
    # Shouldn't happen but again, ease of debug
    if(not pop or pop < 1):
        return "Could not complete simulation, check request parameters. Population must be specified as a positive integer.", 400

    sim = Simulation(pop,i0,r0,b,y,d_r,mw_c,vax_off,vax_inf)

    # -- More Input Validation ? -- #
    # Idk how necessary input validation is, because the requests should be good, specified through the UI

    # If the simulation fails it's probably our fault, return 500
    try:
        sim.simulate(days)
        I_Vector = sim.get_I_Vector() # needed twice, so only call once
        # Create our Vector dictionaries
        sVd = dict(name="susceptible_vector",data=sim.get_S_Vector())
        iVd = dict(name="infected_vector",data=sim.get_I_Vector())
        rVd = dict(name="recovered_vector",data=sim.get_R_Vector())
        vVd = dict(name="vaccinated_vector",data=sim.get_V_Vector())
        dVd = dict(name="dead_vector",data=sim.get_D_Vector())
        activeCases = dict(name="active_cases",data=sim.get_Active_Cases(I_Vector))
        json_output = jsonify(dict(data_vectors=[sVd,iVd,rVd,vVd,dVd,activeCases]))

    except RuntimeError:
        return "The simulation just went bad... But you're the best I ever had <3", 500
        
    return json_output

    


