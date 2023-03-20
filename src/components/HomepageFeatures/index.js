import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'By Developers, for Developers',
    Svg: require('@site/static/img/hands.svg').default,
    description: (
      <>
        Get started on your Metaverse-building journey with our all-in-one <b>Metaverse Knowledge Kit</b> carefully crafted by our Klaytn Developers.
      </>
    ),
  },
  {
    title: 'All Resources In One Place',
    Svg: require('@site/static/img/scale.svg').default,
    description: (
      <>
        Get all the information you need - Context of standards, best practice use cases, links to existing libraries tooling, 
        as well as documentation and tutorials on how to use those resources.
      </>
    ),
  },
  {
    title: 'Package & SDK Support',
    Svg: require('@site/static/img/support.svg').default,
    description: (
      <>
        Explore built-in npm packages which wrap 
        functionality of various tools into an easy to use SDK (per tool), 
        Some starter kits with default combinations of tools and configurations.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
