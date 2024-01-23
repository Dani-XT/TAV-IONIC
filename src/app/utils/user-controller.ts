import { User } from "../models/user.model";
import { UtilsService } from "../services/utils.service";
import { ApiService } from "../services/api.service";

export class UserController {

    private apiSvc: ApiService;
    private utilsSvc: UtilsService;

    private flags: boolean = false;

    constructor(apiSvc: ApiService, utilsSvc: UtilsService) {
        this.apiSvc = apiSvc;
        this.utilsSvc = utilsSvc;
    }

    createUser(user : User) {
      this.apiSvc.createUser(user as User)
      .subscribe(
        response => {
          this.utilsSvc.presentToast({
            message: "Usuario creado exitosamente",
            duration: 1500,
            color: "success",
            position: "bottom",
            icon: "checkmark-circle-outline"
          });
          this.utilsSvc.routerLink('/main/home');
        },
        async error => {
          const flags = await this.createTempUser();
          
          if (flags) {
            console.log('Usuario creado exitosamente');
            this.utilsSvc.saveInLocalStorage('user', user);
            this.utilsSvc.presentToast({
              message: "Usuario creado exitosamente",
              duration: 1500,
              color: "succes",
              position: "bottom",
              icon: "checkmark-circle-outline"
            });
            this.utilsSvc.routerLink('/main/home');
          } else {
            console.error('Error al crear usuario', error);
            this.utilsSvc.presentToast({
              message: "Error al crear usuario",
              duration: 1500,
              color: "danger",
              position: "bottom",
              icon: "checkmark-circle-outline"
            });
          }
        }
      );
    }

    createTempUser(): Promise<boolean> {
      return new Promise((resolve) => {
        this.utilsSvc.presentAlert ({
          header: 'Usuario Temporal',
          message: 'Tenemos problemas con el servidor ¿Quieres crear un usuario temporal?',
          mode: 'ios',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                resolve(false);
              },
            }, {
              text: 'Aceptar',
              handler: () => {
                resolve(true);
              },
            },
  
          ],
        });
      });
    }


    deleteUser(user: User) {
        // Implementa la lógica para eliminar un usuario
    }

    updateUser(user: User) {
        // Implementa la lógica para actualizar un usuario
    }
}
