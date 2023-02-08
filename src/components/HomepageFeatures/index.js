import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Built for Developers',
    Svg: require('@site/static/img/dev.svg').default,
    description: (
      <>
        Best in-class documentation and resources to help you get started quickly.
        so you can spend less time on infrastructure and more time building.
      </>
    ),
  },
  {
    title: 'Informational Content',
    Svg: require('@site/static/img/information.svg').default,
    description: (
      <>
        Provides context of standards, usecases, best practices, links to existing libraries tooling,
        as well as documentation and tutorials on how to use those resources.
      </>
    ),
  },
  {
    title: 'Package & SDK Support',
    Svg: require('@site/static/img/sdk.svg').default,
    description: (
      <>
        Built-in npm packages which wrap 
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
