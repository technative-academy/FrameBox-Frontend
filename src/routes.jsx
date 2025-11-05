import Root from "./components/root/Root";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <div style={{ padding: 16 }}>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "movies",
        element: <Movies />,
      },

      {
        path: "*",
        element: (
          <div style={{ padding: 16 }}>
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        ),
      },
    ],
  },
];

export default routes;
