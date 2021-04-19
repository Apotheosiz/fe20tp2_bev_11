
//simple component for every button in graph settings on homepage
//takes in multiple props
const IntervalSpan = ({ timeInterval, yesterday, startTime, defaultChecked, frequency, setOptionsState, setTimeInterval, text }) => (
  <span
    className={(timeInterval === startTime + "/" + yesterday) ? "active" : ""}
    data-value={startTime + "/" + yesterday}
    name="gender" defaultChecked={defaultChecked}
    onClick={(event) => {
      setOptionsState(frequency);
      setTimeInterval(event.target.dataset.value)
    }}
  > {text} </span>
);

export default IntervalSpan;