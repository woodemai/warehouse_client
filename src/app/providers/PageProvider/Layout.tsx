import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Toaster } from "../../../shared/components/ui/toaster";
import Header from './header/Header';
const Layout = () => {
    const location = useLocation()
    const currentOutlet = useOutlet()
    return (
        <>
            <Header />
            <Toaster />
            <SwitchTransition>
                <CSSTransition
                    key={location.pathname}
                    timeout={300}
                    classNames={'page'}
                    unmountOnExit
                >
                    {() => (
                        <div className="pt-20 w-full min-h-screen h-full">
                            {currentOutlet}
                        </div>
                    )}

                </CSSTransition>
            </SwitchTransition>

        </>
    );
}

export default Layout;