import Firebase from "firebase/app";

export async function signUp ({ email, password }: { email: string, password: string }) {
  const credential = await Firebase.auth().createUserWithEmailAndPassword(email, password);
  if (credential.user && !credential.user.emailVerified) {
    console.log('[email verification] sending...')
    credential.user.sendEmailVerification().then(() => {
      console.log('[email verification] sent !')
    })
  }

  return credential;
}

// https://firebase.google.com/docs/auth/custom-email-handler
export function verifyEmail (actionCode: string) {
  return Firebase.auth().applyActionCode(actionCode);
}