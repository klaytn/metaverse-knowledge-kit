import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

const title = <Translate>Metaverse Knowledge Kit</Translate>;
const tagline = <Translate>Seamlessly build your Metaverse on Klaytn</Translate>;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner, styles.heroBg)}
    >
      <div className={clsx(styles.heroElements)}>
        <img className={clsx(styles.elementSphere)} src="/img/klaytn-sphere.png"/>
        <img className={clsx(styles.elementRedstairs)} src="/img/red-stairs.png"/>
      </div>
      <div className={clsx('container', styles.heroContainer)}>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <Translate>Getting Started - 5 min ⏱️</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Metaverse Knowledge Kit ${title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
