import { computed, signal } from "@angular/core"
import { ApiService } from "../core/services/api.service";


export class AuthStore {

  private _user = signal<any>(null);


  isLoggedIn = computed(() => !!this._user());


  constructor(private api: ApiService) { }

  login(email:string, password:string) {
    this.api.login(email, password).subscribe(user => {
      this._user.set(user);
    })
  }

  logout(){
    this._user.set(null);
  }

  constructorEffect() {
    console.log("AuthStore initialized", this._user());
  }
}
