import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import SignInPage from './components/signin/signin'; // Correct import path for SignInPage


function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="app-header">
                    <div className="app-title">WebGis Dashboard</div>
                    <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px'  , color:'black'}}>
              2024 © TM
            </div>
                    <div className="auth-buttons">
                        <SignedOut>
                            <SignInButton className="sign-in-button" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<SignedIn><MainLayout /></SignedIn>}>
                        <Route index element={<MainLayout />} />
                        <Route path="Demo"  />
                        <Route path="Demo2" />
                        <Route path="Demo3"  />
                        <Route path="Demo4"  />
                        <Route path="Demo5"  />
                    </Route>
                    <Route path="/sign-in" element={<SignInPage />} />
                    
                </Routes>
                
            </div>
        </BrowserRouter>
    );
}

export default App;
