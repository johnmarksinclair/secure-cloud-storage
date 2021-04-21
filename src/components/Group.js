import { Header, Icon } from "semantic-ui-react";
import { Button } from "react-bootstrap";

const Group = () => {
  const DisplayGroups = () => {
    return (
      <div className="h-100 pt-3">
        <div className="h-100 col d-flex flex-column justify-content-center align-items-center">
          <Header icon>
            <Icon name="group" />
            No Groups
          </Header>
          Join one with the button above
        </div>
      </div>
    );
  };

  return (
    <div className="vh col py-4">
      <div className="h-100 d-flex flex-column">
        <div className="row pl-3 pr-4 py-2">
          <div className="col-6 d-flex align-items-center">
            <Header>My Groups</Header>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="ml-auto">
              <Button className="widebtn" variant="info">
                Join Group
              </Button>
            </div>
          </div>
        </div>
        <div className="grow">
          <DisplayGroups />
        </div>
      </div>
    </div>
  );
};

export default Group;
