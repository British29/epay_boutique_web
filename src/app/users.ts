export class Users {
    public Id: number;
    public nom: string;
    public prenoms: string;
    public telephone: string;
    public pwd: string;
    public email: string;

    constructor(Id: number, nom: string,prenoms: string,telephone: string, pwd: string, email: string) {
        this.Id = Id;
        this.nom = nom;
        this.prenoms = prenoms;
        this.telephone = telephone;
        this.pwd = pwd;
        this.email = email;
    }
}


