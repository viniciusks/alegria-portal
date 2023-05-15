export class User {
  constructor(
    public _id: string,
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string,
    public country: string,
    public state: string,
    public city: string,
    public roles: string[],
    public action: string,
    public artisticFormation: string,
    public professionalArt: string,
    public englishLevel: string,
    public spanishLevel: string,
    public spiritCenter: string,
    public otherLanguages: string,
    public whatsapp: string,
    public isWorker: boolean,
    public isPlayer: boolean,
    public isTheater: boolean,
    public isLiterature: boolean,
    public isDancer: boolean,
    public isEFASCoordinator: boolean,
    public isCONCAFRASCoordinator: boolean,
    public isVisualArt: boolean,
    public isActive: boolean,
    public instruments: string[],
    public image?: Document
  ) {}
}
