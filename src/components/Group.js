import { Button, Header, Segment } from "semantic-ui-react";

const Group = () => {
  return (
    <div className="h-100">
      <Segment placeholder className="h-100">
        <Header icon>You aren't in any groups yet</Header>
        <Button primary>Join Group</Button>
        {/* <div className="col">
          <div className="row h-100">
            <div className="col-6 text-center">yo</div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-center">
              <div>yo</div>
            </div>
          </div>
        </div> */}
      </Segment>
    </div>
  );
};

export default Group;
