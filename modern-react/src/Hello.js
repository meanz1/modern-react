import React from "react";

function Hello({ name, color }) {
  return (
    <div>
      안녕하세요 {name} my favorite color is {color}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
