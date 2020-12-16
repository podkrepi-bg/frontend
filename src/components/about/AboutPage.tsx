import Layout from 'components/layout/Layout'

import styles from './about.module.scss'

export default function AboutPage() {
  return (
    <Layout title="About">
      <div className={styles.page}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod feugiat fringilla.
        Mauris sed elit facilisis, consequat nisi quis, sagittis diam. Morbi tincidunt sollicitudin
        odio, vel pharetra metus efficitur at. Vestibulum venenatis ut purus at laoreet. Integer ac
        neque nec nibh sollicitudin imperdiet a et arcu. Nam et diam eget orci auctor rhoncus. Ut
        fermentum pellentesque mauris, bibendum scelerisque lorem accumsan cursus. Maecenas
        hendrerit purus vel pulvinar pellentesque. Donec non mi aliquet purus sollicitudin iaculis.
        Cras nec urna commodo, ullamcorper diam ac, vestibulum lacus. Sed imperdiet augue vel turpis
        luctus accumsan. In hac habitasse platea dictumst. In interdum nunc nec mi eleifend
        consectetur.
      </div>
    </Layout>
  )
}
