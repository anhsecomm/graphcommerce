import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  AddressSingleLine,
  OrderStateLabelInline,
  SignOutForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CustomerNewsletterToggle } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPerson,
  iconShutdown,
  iconStar,
  TimeAgo,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Box, Link } from '@mui/material'
import { LayoutDocument, LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const abcd = [
  {
    image: 'https://demo.magetop.com/marketplace/pub/static/frontend/Magento/luma/en_US/Magetop_Marketplace/images/home/sign-up.png',
    title: 'SIGN UP',
  },
  {
    image: 'https://demo.magetop.com/marketplace/pub/static/frontend/Magento/luma/en_US/Magetop_Marketplace/images/home/create-icon.png',
    title: 'CREATE',
  },
  {
    image: 'https://demo.magetop.com/marketplace/pub/static/frontend/Magento/luma/en_US/Magetop_Marketplace/images/home/sell-icon.png',
    title: 'SELL',
  }
]

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function SellerIndexPage() {

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Seller')} metaRobots={['noindex']} />
      <Container maxWidth='sm'>
      <Box textAlign='center' mt={16} mb={16} fontSize={24} fontWeight={700}>
        Sell On Our Marketplace
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(abcd).map((item, index) => (
          <Grid xs={2} sm={4} key={index}>
            <Item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Link href="seller" color="inherit">
        <Button variant="contained" sx={{
          width: 300,
          display: 'flex',
          marginTop: 3,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>Start now</Button>
      </Link>
      
      </Container>
    </>
  )
}

export default SellerIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
