import { authdb } from "../models/authModels";
import { OAuthProvider } from "../oauth/providers/provider";

export const connectUserToAccount = async (
  user: {
    email: string;
    name: string;
  },
  provider: {
    provider: OAuthProvider;
    providerId: string;
  }
) => {

  let existUser = await authdb.user.findOne({ email: user.email });
  console.log('lets connect',existUser)

  if (!existUser) {
   
    // Create new user if they don't exist
    existUser = await authdb.user.create({
      email: user.email,
      name: user.name,
      accounts: [{ provider: provider.provider, providerId: provider.providerId }],
    });
    console.log('user doesnt exist', existUser)
    return existUser;
  }

  // Check if provider is already linked
  const isProviderLinked = existUser.accounts.some(
    (account) => account.provider === provider.provider
  );

  if (!isProviderLinked) {
    // Add provider if it's not linked
    existUser = await authdb.user.findOneAndUpdate(
      { email: user.email },
      { $push: { accounts: { provider: provider.provider, providerId: provider.providerId } } },
      { new: true } // Return the updated document
    );
  }

  return existUser;
};
