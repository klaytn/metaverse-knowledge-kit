import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { title, tagline } = siteConfig;

  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner, styles.heroBg)}
    >
      <div className={clsx(styles.heroElements)}>
        <img className={clsx(styles.elementSphere)} src="/img/klaytn-sphere.png"/>
        <img className={clsx(styles.elementRedstairs)} src="/img/red-stairs.png"/>
      </div>
      <div className={clsx('container', styles.heroContainer)}>
        <h1 className="hero__title">{translate({ message: title })}</h1>
        <p className="hero__subtitle">{translate({ message: tagline })}</p>
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
  const { tagline } = siteConfig;

  return (
    <Layout
      title={tagline}
      description={tagline}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
