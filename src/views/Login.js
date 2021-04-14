import { Icon, Segment } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import { signInWithGoogle } from "../firebase";

const Login = () => {
  return (
    <div className="vh p-4 bg-info d-flex justify-content-cetner align-items-center">
      <div className="h-75 mx-auto col-xs-12 col-sm-10 col-md-8 col-lg-6">
        <Segment placeholder className="h-100">
          <div className="text-info h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="pt-4 pb-4 text-center">
              <h2 className="mb-1">
                <Icon name="cloud" className="mr-3" />
                Secure Store
              </h2>
              the secure cloud storage solution
            </div>
            {/* <Button variant="dark">
              <div className="p-2 text-center">
                <Icon name="github" className="mr-3" />
                Sign In with GitHub
              </div>
            </Button> */}
            <Button variant="info" onClick={() => signInWithGoogle()}>
              <div className="p-2 text-center">
                <Icon name="google" className="mr-3" />
                Sign In with Google
              </div>
            </Button>
          </div>
        </Segment>
      </div>
    </div>
  );
};

export default Login;
