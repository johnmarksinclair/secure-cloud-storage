import { Button, Header, Icon, Segment } from "semantic-ui-react";

const Files = () => {
  return (
    <Segment placeholder className="h-100">
      <Header icon>
        <Icon name="file outline" />
        My Files
      </Header>
      <Button primary>Add Document</Button>
    </Segment>
  );
};

export default Files;
