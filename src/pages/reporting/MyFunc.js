import { useEffect } from "react";

function MyFunc() {
  // const [a, setA] = useState(false);
  const innerFunction = () => {
    // do something!

    console.log("hellau");
  };

  useEffect(() => {
    innerFunction();
    // The effect calls innerFunction, hence it should declare it as a dependency
  }, []);

  return <div onClick={innerFunction}>hello</div>;
}

export default MyFunc;
