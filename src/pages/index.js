import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

const title = <Translate>Klaytn Metaverse</Translate>
const tagline = <Translate>Lets Build The Metaverse Together</Translate>

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.heroBg)}>
      <div className={clsx(styles.heroElements)}>
        <img className={clsx(styles.elementCloudLeft)} src="/img/cloud-left.png"/>
        <img className={clsx(styles.elementLogo)} src="/img/3D-Sphere-Planet.png"/>
        <img className={clsx(styles.elementMinecraft)} src="/img/minecraft.png"/>
        <img className={clsx(styles.elementPerson)} src="/img/person.png"/>
        <img className={clsx(styles.elementRocket)} src="/img/rocket.png"/>
        <img className={clsx(styles.elementCloudRight)} src="/img/cloud-right.png"/>
        <img className={clsx(styles.elementCoin)} src="/img/coin.png"/>
        <img className={clsx(styles.elementSpeedDelivery)} src="/img/speed-delivery.png"/>

      </div>
      <div className={clsx('container', styles.heroContainer)}>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/introduction">
            <Translate>Getting Started - 10min ⏱️</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Klaytn Metaverse Docs ${title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
} 
