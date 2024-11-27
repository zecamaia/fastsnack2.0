import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const showDialog = ({
    type = 'info',
    title = 'Atenção',
    text = '',
    confirmButtonText = 'OK',
    onConfirm = null,
}) => {

    return mySwal.fire({
        type,
        icon,
        title,
        text,
        confirmButtonText,
        onConfirm
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
}

export const showValidationAlert = (message) => {
    return mySwal.fire({
        title: 'Aviso',
        text: message,
        icon: 'warning',
        confirmButtonText: 'Entendi',
    });
};

export const showSuccesAlert = (message) => {
    return mySwal.fire({
        title: 'Sucesso',
        text: message,
        icon: 'success',
        confirmButtonText: 'Ok',
    })
}


export const showErrorAlert = (message) => {
    return mySwal.fire({
        title: 'Erro',
        text: message,
        icon: 'error',
        confirmButtonText: 'Tentar Novamente',
    });
}

export const showConfirmAlert = ({
    title = 'Tem certeza?',
    text = 'Essa ação não pode ser desfeita!',
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    onConfirm = null,
    showCancelButton = true
}) => {
    return mySwal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton,
        confirmButtonText,
        cancelButtonText
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm()
        }
    })
}




