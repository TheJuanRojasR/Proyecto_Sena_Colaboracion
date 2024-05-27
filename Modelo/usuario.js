class Usuario extends Connect{
    constructor(){
        super();
        this.id_usuario = 0;
        this.nombre_usuario = '';
        this.id_rol = '';
        this.numero_documento = '';
        this.correo_eletronico = '';
        this.contrasena = '';
        this.estado_usuario = '';
    }

    setData(data){
        this.id_usuario = data.id_usuario;
        this.nombre_usuario = data.nombre_usuario;
        this.id_rol = data.id_rol;
        this.numero_documento = data.numero_documento;
        this.correo_eletronico = data.correo_eletronico;
        this.contraseña = data.contraseña;
        this.estado_usuario = data.estado_usuario;
    }

    getData(){
        return{
            id_usuario: this.id_usuario,
            nombre_usuario: this.nombre_usuario,
            id_rol: this.id_rol,
            numero_documento: this.numero_documento,
            correo_eletronico: this.correo_eletronico,
            contraseña: this.contraseña,
            estado_usuario: this.estado_usuario        
        }
    }

    //Metodo para obtener los tipos de documentos
    getAllDocumentos(getAllDocumentosCallback){
        const endpoint = 'usuarios';
        const method = 'GET';
        this.connect({}, endpoint, method, getAllDocumentosCallback);
    }

    // Metodo para registrar un usuario
    register( dataRequest, registerCallback ){
        const endpoint = 'usuarios/registro';
        const method = 'POST';
        this.connect( dataRequest, endpoint, method, registerCallback );
    }

    // Metodo para verificar el Login
    login( dataRequest, loginCallback ){
        const endpoint = 'usuarios/login';
        const method = 'POST';
        this.connect( dataRequest, endpoint, method, loginCallback );
    }

    // Metodo para registrar los perfiles
    registerPerfil( dataRequest, registerPerfilCallback ){
        const endpoint = 'usuarios/perfiles/registro';
        const method = 'POST';
        this.connect( dataRequest, endpoint, method, registerPerfilCallback );
    }

    getAllPerfil(getAllPerfilCallback ){
        const endpoint = 'usuarios/perfiles';
        const method = 'GET';
        this.connect( {}, endpoint, method, getAllPerfilCallback );
    }

    // Metodo para actualizar el perfil
    updatePerfil( dataRequest, updatePerfilCallback ){
        const endpoint = 'usuarios/perfiles';
        const method = 'PUT';
        this.connect( dataRequest, endpoint, method, updatePerfilCallback );
    }

    // Meotodo para eliminar un perfil
    deletePerfil( dataRequest, deletePerfilCallback ){
        const endpoint = 'usuarios/perfiles/eliminar';
        const method = 'PUT';
        this.connect( dataRequest, endpoint, method, deletePerfilCallback );
    }

    // Metodo para mostrar la informacion del usuario
    getUsuario(getUsuarioCallback ){
        const endpoint = 'usuarios/ajustes';
        const method = 'GET';
        this.connect( {}, endpoint, method, getUsuarioCallback );
    }

    // Metodo para actualizar la informacion del usuario
    updateUsuario( dataRequest, updateUsuarioCallback ){
        const endpoint = 'usuarios/ajustes';
        const method = 'PUT';
        this.connect( dataRequest, endpoint, method, updateUsuarioCallback );
    }
}