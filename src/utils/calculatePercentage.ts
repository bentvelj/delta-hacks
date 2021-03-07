export default function calculateDate() {
  const numberOfDaysInFuture = 100;
  const startDate = new Date("1/25/2020");
  const presentDate = new Date(Date.now() - (1000 * 60 * 60 * 24));
  const finalDate = new Date(Date.now() + ((numberOfDaysInFuture - 1) * (1000 * 60 * 60 * 24))); // final date in the slider, which is present date plus desired number of days in the future

  const diffOfTimeFromStartToFinal = Math.abs(finalDate.getTime() - startDate.getTime()); // difference of milliseconds between the max slider date and the min slider date 
  const diffOfDaysFromStartToFinal = Math.ceil(diffOfTimeFromStartToFinal / (1000 * 60 * 60 * 24));  // same as above but converted to difference of days

  const diffOfTimeFromStartToPresent = Math.abs(presentDate.getTime() - startDate.getTime()); // difference of milliseconds between the present date and the min slider date 
  const diffOfDaysFromStartToPresent = Math.ceil(diffOfTimeFromStartToPresent / (1000 * 60 * 60 * 24));  // same as above but converted to difference of days
  
  return (diffOfDaysFromStartToPresent / diffOfDaysFromStartToFinal) * 100;
}
