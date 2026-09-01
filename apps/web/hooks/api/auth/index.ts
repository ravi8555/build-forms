// hooks/api/auth/index.ts

import { trpc } from "~/trpc/client";

export const useSignup = () => {
  const utils = trpc.useUtils()
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess: async () =>{
      await utils.auth.getLoggedInUserInfo.invalidate()
    }}
  );

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status
  };
};


// export const useSignIn = ()=>{
//    const utils = trpc.useUtils()
//   const {
//     mutateAsync: signInwithEmailAndPasswordAsync,
//     mutate: signInwithEmailAndPassword,
//     error,
//     isError,
//     failureCount,
//     isIdle,
//     isSuccess,
//     status
//   } = trpc.auth.signInwithEmailAndPassword.useMutation({
//     onSuccess: async () =>{
//       await utils.auth.getLoggedInUserInfo.invalidate()
//     }});

//   return {
//     signInwithEmailAndPasswordAsync,
//     signInwithEmailAndPassword,
//     error,
//     isError,
//     failureCount,
//     isIdle,
//     isSuccess,
//     status
//   };

// }


// export const useUser = (enabled = true) =>{
//   const {
//     data: user,
//     error,
//     isFetched,
//     isFetching,
//     isLoading,
//     status
//   } = trpc.auth.getLoggedInUserInfo.useQuery(undefined,{
//     enabled,
//     retry:false,
//   })

//   return {
//     id:user?.id,
//     // id: query.data?.id,
//     // user: query.data,
//     user,
//     error,
//     isFetched,
//     isFetching,
//     isLoading,
//     status
//   }
// }


export const useUser = (enabled = true) =>{
  const query =
  trpc.auth.getLoggedInUserInfo.useQuery(
    undefined,
    {
      retry: false,
      enabled,
    }
  );

  return {
    // id:user?.id,
    id: query.data?.id,
    user: query.data,
    // user,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetched: query.isFetched,

    error: query.error,

    refetch: query.refetch,

    status: query.status,
  }
}




export const useSignIn = ()=>{
   const utils = trpc.useUtils()
  const {
    mutateAsync: signInwithEmailAndPasswordAsync,
    mutate: signInwithEmailAndPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status
  } = trpc.auth.signInwithEmailAndPassword.useMutation({
    onSuccess: async () =>{
      await utils.auth.getLoggedInUserInfo.invalidate()
    }});

  return {
    signInwithEmailAndPasswordAsync,
    signInwithEmailAndPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status
  };

}


export const useLogout = () => {
  const utils = trpc.useUtils()

  const {
    mutateAsync: logoutAsync,
    mutate: logout,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      // await utils.auth.getLoggedInUserInfo.invalidate()

       await utils.auth.getLoggedInUserInfo.cancel();

    utils.auth.getLoggedInUserInfo.setData(undefined, undefined);

    await utils.invalidate();

      // // optional stronger cleanup
      await utils.auth.getLoggedInUserInfo.reset();
    },
  })

  return {
    logoutAsync,
    logout,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  }
}

export const useForgotPassword = () => {
  const utils = trpc.useUtils()

  const {
    mutateAsync: forgotPasswordAsync,
    mutate: forgotPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.forgotPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.invalidate()
    },
  })

  return {
    forgotPasswordAsync,
    forgotPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
  }
}

export const useResetPassword = () => {
  const utils = trpc.useUtils()

  const {
    mutateAsync: resetPasswordAsync,
    mutate: resetPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.resetPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.invalidate()
    },
  })

  return {
    resetPasswordAsync,
    resetPassword,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
  }
}
