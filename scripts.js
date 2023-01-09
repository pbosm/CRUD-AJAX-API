//MODAL FUNÇÕES
let URL = 'connAPI.php';

function toggleModal(size = false) {
    let modal = $('.fp-modal');

    resizeModal(size);

    let statusModal = true;
    if (modal.is(':visible')) {
        statusModal = false;

        $('.c-modal').html('');
    }

    modal.attr('show', statusModal);
    $('.b-modal').scrollTop(0);

    $('.x-modal').click(function () {
        toggleModal();
    });
}

function resizeModal(size = false) {
    $('.b-modal').removeClass('modal-small modal-large');

    let classes = {
        'small': 'modal-small',
        'large': 'modal-large',
    };

    $('.b-modal').addClass((classes[size]) ? classes[size] : '');
}

function showClients() {
    $("#msg").empty();

    $.ajax({
        type: 'POST',
        url: URL,
        data: {
            content: JSON.stringify(URL),
            function: 'showClient',
        },
        success: function (obj) {
            let select = obj.data;
            console.log(select);
            $('.h-modal-title').html('Clientes');
            let html = $('#templateSelectClient').html();
            $('.c-modal').html(html);

            for (let prop in select) {
                let selects = select[prop];
                let html = $('#templateRowSelectClient').html();

                html = html.replace(/{{order}}/g);
                html = html.replace('{{cliente}}', selects.cliente);
                html = html.replace('{{cidade}}', selects.cidade);
                html = html.replace('{{email}}', selects.email);

                html = html.replace('{{idedit}}', selects.id);
                html = html.replace('{{clienteedit}}', selects.cliente);
                html = html.replace('{{cidadeedit}}', selects.cidade);
                html = html.replace('{{emailedit}}', selects.email);

                html = html.replace('{{iddelete}}', selects.id);
                html = html.replace('{{clientedelete}}', selects.cliente);
                $('table.clients tbody').append(html);
            }
            toggleModal();
        },
        error: function () {
            $('#msg').html('Erro ao trazer tabela');
        }
    });
}

function createClient() {
    $("#msg").empty();

    $('#formCreate').validate({
        rules: {
            txtCliente: {
                required: true
            },
            txtCidade: {
                required: true
            },
            txtEmail: {
                required: true
            },
        },
        messages: {
            txtCliente: {
                required: 'Informe um nome'
            },
            txtCidade: {
                required: 'Informe sua cidade'
            },
            txtEmail: {
                required: 'Informe sua email'
            },
        },
        submitHandler: function (form) {

            let content = {
                'cliente': $('#txtCliente').val(),
                'cidade': $('#txtCidade').val(),
                'email': $('#txtEmail').val()
            };

            $.ajax({
                type: 'POST',
                url: URL,
                data: {
                    content: JSON.stringify(content),
                    function: 'insertClient'
                },
                beforeSend: function () {
                    $('#msg').html('Carregando...');
                },
                success: function (obj) {
                    $('#msg').html(obj.data);
                },
                error: function () {
                    $('#msg').html('Página não encontrada');
                }
            });
        }
    });
}

function editClient(id, cliente, cidade, email) {
    $('.h-modal-title').html('Clientes');
    let html = $('#templateEditClient').html();
    $('.c-modal').html(html);
    $("#msg").empty();

    $('input[name="txtClienteEdit"]').val(cliente);
    $('input[name="txtCidadeEdit"]').val(cidade);
    $('input[name="txtEmailEdit"]').val(email);

    $('#editClient').validate({
        rules: {
            txtClienteEdit: {
                required: true
            },
            txtCidadeEdit: {
                required: true
            },
            txtEmailEdit: {
                required: true
            },
        },
        messages: {
            txtClienteEdit: {
                required: 'Informe um nome'
            },
            txtCidadeEdit: {
                required: 'Informe sua cidade'
            },
            txtEmailEdit: {
                required: 'Informe sua email'
            },
        },
        submitHandler: function (form) {

            const content = {
                'id': id,
                'cliente': $('input[name="txtClienteEdit"]').val(),
                'cidade': $('input[name="txtCidadeEdit"]').val(),
                'email': $('input[name="txtEmailEdit"]').val()
            }

            $.ajax({
                type: 'POST',
                url: URL,
                data: {
                    content:  JSON.stringify(content), 
                    function: 'updateClient'
                },
                success: function (response) {
                    let obj = response;
                    console.log(response);
                    if (obj.status == 'erro') {
                        showError(obj.data);
                    } else {
                        $('#msg').html($('input[name="txtClienteEdit"]').val() + ' editado com sucesso');
                        toggleModal();
                    }
                },
                error: function () {
                    showError('Erro interno');
                }
            });
        }
    });
}

function deleteClient(id, cliente) {
    $("#msg").empty();

    const content = {
        'id': id,
        'cliente': cliente,
    }

    $.ajax({
        type: 'POST',
        url: URL,
        data: {
            content:  JSON.stringify(content),
            function: 'deleteClient'
        },
        success: function (data) {
            $('#msg').html(cliente + ' apagado com sucesso')
            toggleModal();
        },
        error: function () {
            $('#msg').html('Erro ao excluir cliente');
        }
    });
}