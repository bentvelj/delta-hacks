export default function calculateDate(sliderPercantage: number) {
  const numberOfDaysInFuture = 100;
  const startDate = new Date("1/25/2020")
  const presentDate = new Date(Date.now() + (numberOfDaysInFuture * (1000 * 60 * 60 * 24)));

  const diffOfTimeFromFirstToPresent = Math.abs(presentDate.getTime() - startDate.getTime());
  const diffOfDaysFromFirstToPresent = Math.ceil(diffOfTimeFromFirstToPresent / (1000 * 60 * 60 * 24)); 

  const diffOfDaysFromFirstToSelected = (sliderPercantage / 100) * diffOfDaysFromFirstToPresent;
  const diffOfTimeFromFirstToSelected = diffOfDaysFromFirstToSelected * (1000 * 60 * 60 * 24);

  return new Date(startDate.getTime() + diffOfTimeFromFirstToSelected);
}
