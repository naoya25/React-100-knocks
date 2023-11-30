interface Forecast {
  dateLabel: string;
  telop: string;
  temperature: {
    min: {
      celsius: string | null;
      fahrenheit: string | null;
    };
    max: {
      celsius: string;
      fahrenheit: string;
    };
  };
  image: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
}
export default Forecast;
