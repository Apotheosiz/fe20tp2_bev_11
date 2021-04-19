import app from 'firebase/app';
import config from './config';
import 'firebase/auth';
import 'firebase/database';

class Firebase {
    constructor() {
        app.initializeApp(config);

        /* Helper */
        this.serverValue = app.database.ServerValue;
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();
                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }
                        if (!dbUser.tickers) {
                            dbUser.tickers = {
                                AAPL: {
                                    currency: 'USD',
                                    exchangeShortName: 'NASDAQ',
                                    name: 'Apple Inc.',
                                    stockExchange: 'NasdaqGS',
                                    symbol:'AAPL',
                                }
                            };
                        }
                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    // *** Message API ***
    message = (userComp, uid) => this.db.ref(`companies/${userComp}/messages/${uid}`);
    messages = userComp => this.db.ref(`companies/${userComp}/messages`);
    
}

export default Firebase;