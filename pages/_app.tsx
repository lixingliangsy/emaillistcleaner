import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ListClean" />
        <meta property="og:description" content="Paste a list of emails and instantly flag invalid, role-based (info@, admin@) and disposable addresses, plus a deliverability score and a copy-paste-ready clean list. Protects your sender reputation before every campaign." />
        <meta property="og:url" content="https://emaillistcleaner.lxsaihub.com/" />
        <meta property="og:image" content="https://emaillistcleaner.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ListClean" />
        <meta name="twitter:description" content="Paste a list of emails and instantly flag invalid, role-based (info@, admin@) and disposable addresses, plus a deliverability score and a copy-paste-ready clean list. Protects your sender reputation before every campaign." />
        <meta name="twitter:image" content="https://emaillistcleaner.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"ListClean","url":"https://emaillistcleaner.lxsaihub.com/","description":"Paste a list of emails and instantly flag invalid, role-based (info@, admin@) and disposable addresses, plus a deliverability score and a copy-paste-ready clean list. Protects your sender reputation before every campaign.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
