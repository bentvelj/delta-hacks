export default function calculateDate(sliderPercantage: number) {
  const numberOfDaysInFuture = 100;
  const startDate = new Date("1/25/2020")
  const finalDate = new Date(Date.now() + (numberOfDaysInFuture * (1000 * 60 * 60 * 24))); // final date in the slider, which is present date plus desired number of days in the future

  const diffOfTimeFromStartToFinal = Math.abs(finalDate.getTime() - startDate.getTime()); // difference of milliseconds between the max slider date and the min slider date 
  const diffOfDaysFromStartToFinal = Math.ceil(diffOfTimeFromStartToFinal / (1000 * 60 * 60 * 24));  // same as above but converted to difference of days

  const diffOfDaysFromStartToSelected = (sliderPercantage / 100) * (diffOfDaysFromStartToFinal); /* since (days from min date to selected date) / (days from min date to max date) = slider percentage, we can
                                                                                                    can calculate (days from min date to selected date) = slider percentage * (days from min date to max date) */
  const diffOfTimeFromStartToSelected = diffOfDaysFromStartToSelected * (1000 * 60 * 60 * 24); // same as above but converted to diference of milliseconds

  return new Date(startDate.getTime() + diffOfTimeFromStartToSelected); // returns calculated selected date from slider bar
}
