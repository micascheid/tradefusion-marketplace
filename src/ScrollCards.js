// import * as React from "react";
// import { render } from "react-dom";
// import { animated, useSpring } from "react-spring";
// import { useGesture } from "react-use-gesture";
// import "./styles.scss";
//
// const clamp = (value: number, clampAt: number = 30) => {
//   if (value > 0) {
//     return value > clampAt ? clampAt : value;
//   } else {
//     return value < -clampAt ? -clampAt : value;
//   }
// };
//
// const movies = [
//   "/breaking-bad.webp",
//   "/the-leftovers.jpg",
//   "/game-of-thrones.jpg",
//   "/true-detective.jpg",
//   "/walking-dead.jpg"
// ];
//
// const App = () => {
//   const [style, set] = useSpring(() => ({
//     transform: "perspective(500px) rotateY(0deg)"
//   }));
//
//   const bind = useGesture({
//     onScroll: (event) => {
//       console.log(event);
//       set({
//         transform: `perspective(500px) rotateY(${
//           event.scrolling ? clamp(event.delta[0]) : 0
//         }deg)`
//       });
//     },
//     onDrag: (event) => {
//       if (event.dragging) {
//         document.querySelector(".container").scrollLeft += event.delta[0];
//       }
//     },
//     onWheel: (event) => {
//       if (event.wheeling) {
//         document.querySelector(".container").scrollLeft += event.delta[1];
//       }
//     }
//   });
//
//   return (
//     <>
//       <div className="container" {...bind()}>
//         {movies.map((src) => (
//           <animated.div
//             key={src}
//             className="card"
//             style={{
//               ...style,
//               backgroundImage: `url(${src})`
//             }}
//           />
//         ))}
//       </div>
//     </>
//   );
// };
//
// const rootElement = document.getElementById("root");
// render(<App />, rootElement);