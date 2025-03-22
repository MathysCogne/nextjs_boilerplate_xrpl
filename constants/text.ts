interface TextContent {
  metadata: {
    title: string;
    description: string;
    lang: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  navigation: {
    logo: string;
  };
  ledger: {
    connect: string;
    disconnect: string;
    connected_address: string;
    browser_not_supported: string;
    connection_error: string;
    access_denied: string;
    check_ledger: string;
    disconnect_error: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    description: string;
    backHome: string;
  };
}

export const TEXT: TextContent = {
  metadata: {
    title: "Next.js Boilerplate - Auth XRPL",
    description: "Connect to XRPL with Ledger",
    lang: "en"
  },
  hero: {
    title: "Next.js Boilerplate",
    subtitle: "Connect to XRPL with Ledger"
  },
  navigation: {
    logo: "Next.js Boilerplate"
  },
  ledger: {
    connect: "Connect Ledger (XRP)",
    disconnect: "Disconnect",
    connected_address: "Connected address:",
    browser_not_supported: "Your browser does not support WebUSB. Please use Chrome, Edge, or Opera.",
    connection_error: "Connection error",
    access_denied: "USB access denied. Please:\n1. Connect your Ledger\n2. Unlock it\n3. Open XRP app\n4. Try again",
    check_ledger: "To connect your Ledger:\n1. Make sure your Ledger is connected and unlocked\n2. Open the XRP app on your Ledger\n3. Try connecting again",
    disconnect_error: "Error disconnecting"
  },
  notFound: {
    title: "404",
    subtitle: "Error: Not Found",
    description: "Oops ! This page doesn't exist.",
    backHome: "Back to Home"
  },
}; 