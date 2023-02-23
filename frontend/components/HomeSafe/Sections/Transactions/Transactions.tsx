import { Card, Row, Spacer } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import TransactionsHeaderButtons from "./TransactionsHeaderButtons";
import { AppContext } from "@/store/AppContext";
import TransactionsHistory from "./TransactionsHistory";
import TransactionsQueue from "./TransactionsQueue";

const headerButtons = [
  {
    id: 1,
    type: "Queue",
  },
  {
    id: 2,
    type: "History",
  },
];

export default function Transactions({ txs }: { txs: GnosisTransaction[] }) {
  const { transactionsSection, provider } = useContext(AppContext);

  const sectionMap: { [key: string]: JSX.Element } = {
    Queue: <TransactionsQueue txs={txs} />,
    History: <TransactionsHistory />,
  };

  useEffect(() => {
    if (!provider) {
      console.error("Not found provider");
    }
    (async () => {
      // const count = await provider.getLogs();
      console.log(provider);
    })();
  }, []);

  return (
    <Card
      variant="bordered"
      css={{ minHeight: "499px", mw: "522px", borderRadius: "39px" }}
    >
      <Card.Header>
        <Spacer y={2} />
        <Row justify="flex-start">
          {headerButtons.map((button, i) => (
            <>
              <TransactionsHeaderButtons key={i} type={button.type} />
            </>
          ))}
        </Row>
      </Card.Header>
      <Card.Divider />
      <Card.Body>{sectionMap[transactionsSection.type]}</Card.Body>
    </Card>
  );
}
