/** @jsx jsx */
import { Flex, Themed, jsx } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'

// Taken from my personal site
const Layout = ({ location, children, ...props }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.main
        initial='initial'
        animate='animate'
        exit={{ opacity: 0 }}
        key={location.pathname}
        sx={{
          height: '100vh',
        }}
      >
        <Themed.root {...props}>
          <Flex
            sx={{
              minHeight: '100vh',
              height: '100%',
            }}
          >
            {children}
          </Flex>
        </Themed.root>
      </motion.main>
    </AnimatePresence>
  )
}

export default Layout
