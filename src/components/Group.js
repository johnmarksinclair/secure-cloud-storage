import { Button, Header, Segment, Icon } from "semantic-ui-react";

const Group = () => {
  const DisplayGroups = () => {
    return (
      <div className="h-100 pt-3">
        <div className="h-100 col d-flex flex-column justify-content-center align-items-center">
          <Header icon>
            <Icon name="group" />
            No Groups
          </Header>
          Join some with the button above
        </div>
      </div>
    );
  };

  return (
    <div className="vh col py-4">
      <Segment placeholder className="h-100">
        <div className="h-100 d-flex flex-column">
          <div className="row px-3 pt-3">
            <div className="col-6 d-flex align-items-center">
              <Header>My Groups</Header>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <div className="ml-auto">
                <Button primary>Join Group</Button>
              </div>
            </div>
          </div>
          <div className="grow">
            <DisplayGroups />
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default Group;
