import Layout from "@/components/Layout";
import { ElementList, SafeElement } from "@/components";
import { Button, Grid, Text } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Grid.Container
        direction="column"
        gap={2}
        justify="center"
        alignItems="center"
        css={{ textAlign: "center", mt: "30px" }}
      >
        <Grid.Container gap={2} justify="center">
          <Grid xs={4} justify="center">
            <Text h2 size={31} weight="semibold" css={{ textAlign: "center" }}>
              Welcome to the Safe
            </Text>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={4} justify="center">
            <Text
              size={18}
              color={"#878787"}
              weight="normal"
              css={{ lineHeight: "$sm" }}
            >
              The most trusted decentralized custody protocol and collective
              asset management platform.
            </Text>
          </Grid>
        </Grid.Container>

        <Grid.Container
          gap={2}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid xs={4} justify="center">
            <Link href="/create-safe">
              <Button color="primary" css={{ w: "362px", h: "40px" }}>
                Create Safe
              </Button>
            </Link>
          </Grid>
          <Grid xs={4} justify="center">
            <Link href="/load-safe">
              <Button color="secondary" css={{ w: "362px", h: "40px" }}>
                Add existing Safe.
              </Button>
            </Link>
          </Grid>
        </Grid.Container>

        <Grid.Container gap={2} justify="center">
          <Grid xs={4} justify="center">
            <ElementList bgColor="#EFEFEF" title="My Safes">
              <SafeElement
                safe={{
                  avatar: "/avatar-1.png",
                  balance: 100,
                  chain: "Ethereum",
                  address: "0xA01f...AA6A",
                  countOwners: 4,
                  countVoices: 2,
                  symbol: "eth",
                }}
              />
            </ElementList>
          </Grid>
        </Grid.Container>
      </Grid.Container>
    </Layout>
  );
}
