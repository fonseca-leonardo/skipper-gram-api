interface IMaiLConfig {
  driver: 'dren';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'dren',

  defaults: {
    from: {
      email: 'noreply@drenapps.com.br',
      name: 'Equipe Dren Aplicativos',
    },
  },
} as IMaiLConfig;
