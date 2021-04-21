import { Header, Icon } from "semantic-ui-react";
import { Button } from "react-bootstrap";

const Group = () => {
  const DisplayGroups = () => {
    return (
      <div className="h-100 pt-3">
        <div className="h-100 col d-flex flex-column justify-content-center align-items-center">
          <div className="col-xs-6 col-md-3 text-center">
            <Header icon>
              <Icon name="group" />
              No Groups
            </Header>
            <p>Make one with the button or be added to a group by a friend</p>
          </div>
        </div>
      </div>
    );
  };

  const handleNewGroup = () => {
    console.log("new");
  };

  return (
    <div className="vh col py-4">
      <div className="h-100 d-flex flex-column">
        <div className="row px-3 pt-2">
          <div className="col-6 d-flex align-items-center">
            <Header>My Groups</Header>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="ml-auto">
              <Button
                className="widebtn"
                variant="info"
                onClick={handleNewGroup}
              >
                New Group
              </Button>
            </div>
          </div>
        </div>
        <div className="grow scroll mt-4">
          <DisplayGroups />
        </div>
      </div>
    </div>
  );
};

export default Group;
