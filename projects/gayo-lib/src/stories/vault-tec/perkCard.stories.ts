// Component perkCard was generated on Sat Aug 10 2024 22:37:24 GMT+0200 (heure d’été d’Europe centrale)

import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { PerkCardComponent } from '../../lib/components/vault-tec/perk-card/perk-card.component';

const meta: Meta<PerkCardComponent> = {
  title: 'Vault-Tec/PerkCard',
  component: PerkCardComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<PerkCardComponent>;

export const SimplePerkCard: Story = {
  args: {
    description:
      "Vous aimez soulever des gros cailloux ou des gens que vous n'aimez guère ? La Force est déterminée par la circonférence de votre biceps en contraction.",
    perkName: 'strength',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Perception: Story = {
  args: {
    description:
      'Toujours un oeil dans le dos, vous sentez les mouvements autour de vous ? Vous avez un 6ème sens ou un troisième oeil, la Perception est votre atout !',
    perkName: 'perception',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Endurance: Story = {
  args: {
    description:
      "Les femmes gardent un bon souvenir de vos amplitudes d'effort et/ou un marathon ressemble à une balade de mamie pour digérer le repas du dimanche midi ? L'Endurance c'est votre truc, ça ne fait aucun doute.",
    perkName: 'endurance',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Charisma: Story = {
  args: {
    description:
      "Don Juan n'a qu'à bien se tenir, vous êtes le poète que Jean de la Fontaine n'a jamais été. Vous obtenez ce que vous voulez par la parole. Charismatique est la qualité qui vous définit c'est certain.",
    perkName: 'charisma',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Intelligence: Story = {
  args: {
    description:
      "Les plus grands génies des dernières décennies disent avoir tout appris rien qu'en passant du temps avec vous. Vous transpirez des équations et des encyclopédies. Vous êtes quelqu'un d'Intelligent c'est indéniable.",
    perkName: 'intelligence',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Agility: Story = {
  args: {
    description:
      "Vous pratiquez régulièrement des triples saltos arrière, en haut des buildings du coin. Il est aisé pour vous de vous déplacer dans n'importe quel environnement ? Vous êtes Agile, bravo.",
    perkName: 'agility',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};

export const Luck: Story = {
  args: {
    description:
      "Le loto ? Vous l'avez gagné quatre fois le mois dernier. Souvent vous trouvez 50 balles sur le pas de votre porte, ou un accès pour nos abris Vault-Tec. Veinard vous êtes la Chance en personne.",
    perkName: 'luck',
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
    },
    template: `
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px;">
      <vt-perk-card ${argsToTemplate(args)}></vt-perk-card>
      <vt-perk-card ${argsToTemplate(args)} face="back"></vt-perk-card>
    </div>
    `,
  }),
};
