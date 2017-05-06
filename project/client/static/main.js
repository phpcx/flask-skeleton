// custom javascript
    function f_barra() {
        var antes  = form.barra.value;
        var depois = calcula_barra(form.linha.value);
        form.barra.value=depois;
        antes = antes.replace(/[^0-9]/g,'')
        if ((antes != depois) && antes != '')
            swal('O código de barras digitado não confere:\n'+antes+'\n'+depois);
            f_venc();
        return(false);
    }
    function f_linha() {
        var antes  = form.linha.value.replace(/[^0-9]/g,'');
        var depois = calcula_linha(form.barra.value);
        form.linha.value=depois;
        depois = depois.replace(/[^0-9]/g,'')
        if ((antes != depois) && antes != '')
            swal('O código de barras digitado não confere:\n'+antes+'\n'+depois);
            f_venc();
        return(false);
    }
    function f_venc() {
        if ( form.barra.value.substr(5,4) == 0 )
            form.venc.value='O boleto pode ser pago em qualquer data';
        else
            form.venc.value=fator_vencimento(form.barra.value.substr(5,4));
            form.valor.value=(form.barra.value.substr(9,8)*1)+','+form.barra.value.substr(17,2);
            return(false);
    }
    function calcula_barra(linha)
    {
        //var linha = form.linha.value; // Linha Digitável
        barra  = linha.replace(/[^0-9]/g,'');
        //
        // CÁLCULO DO DÍGITO DE AUTO CONFERÊNCIA (DAC)   -   5ª POSIÇÃO
        if (modulo11_banco('34191000000000000001753980229122525005423000') != 1)
            swal('Função "modulo11_banco" está com erro!');
        //
        //if (barra.length == 36) barra = barra + '00000000000';
        if (barra.length < 47 )
            barra = barra + '00000000000'.substr(0,47-barra.length);
        if (barra.length != 47)
            swal ('A linha do código de barras está incompleta!'+barra.length);
            return false;
        //
        barra  = barra.substr(0,4)
                +barra.substr(32,15)
                +barra.substr(4,5)
                +barra.substr(10,10)
                +barra.substr(21,10)
                ;
        //form.barra.value = barra;
        if (modulo11_banco(barra.substr(0,4)+barra.substr(5,39)) != barra.substr(4,1))
            swal('Digito verificador '+barra.substr(4,1)+', o correto é '+modulo11_banco(barra.substr(0,4)+barra.substr(5,39))+'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
        //if (form.barra.value != form.barra2.value) swal('Barras diferentes');
        return(barra);
    }
    function calcula_linha(barra)
    {
        //var barra = form.barra.value; // Codigo da Barra
        linha = barra.replace(/[^0-9]/g,'');
        //
        if (modulo10('399903512') != 8)
            swal('Função "modulo10" está com erro!');

        if (linha.length != 44)
            swal ('A linha do código de barras está incompleta!');
        //
        var campo1 = linha.substr(0,4)+linha.substr(19,1)+'.'+linha.substr(20,4);
        var campo2 = linha.substr(24,5)+'.'+linha.substr(24+5,5);
        var campo3 = linha.substr(34,5)+'.'+linha.substr(34+5,5);
        var campo4 = linha.substr(4,1);     // Digito verificador
        var campo5 = linha.substr(5,14);    // Vencimento + Valor
        //
        if (  modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  ) != campo4 )
            swal('Digito verificador '+campo4+', o correto é '+modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  )+' O sistema não altera automaticamente o dígito correto na quinta casa!');
        //
        if (campo5 == 0) campo5 = '000';
        //
        linha =  campo1 + modulo10(campo1)
                +' '
                +campo2 + modulo10(campo2)
                +' '
                +campo3 + modulo10(campo3)
                +' '
                +campo4
                +' '
                +campo5
                ;
        //if (form.linha.value != form.linha2.value) swal('Linhas diferentes');
        return(linha);
    }
    function fator_vencimento (dias) {
        //Fator contado a partir da data base 07/10/1997
        //*** Ex: 31/12/2011 fator igual a = 5198
        //swal(dias);
        var currentDate, t, d, mes;
        t = new Date();
        currentDate = new Date();
        currentDate.setFullYear(1997,9,7);//swal(currentDate.toLocaleString());
        t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));//swal(t.toLocaleString());
        mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
        dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
        //campo.value = dia +"."+mes+"."+currentDate.getFullYear();campo.select();campo.focus();
        return(t.toLocaleString());
    }
    function modulo10(numero)
    {

        numero = numero.replace(/[^0-9]/g,'');
        var soma  = 0;
        var peso  = 2;
        var contador = numero.length-1;
        //swal(contador);
        //numero = '00183222173';
        //for (var i=0; i <= contador - 1; i++) {
        //swal(10);
        //for (contador=10; contador >= 10 - 1; contador--) {
        while (contador >= 0) {
            //swal(contador);
            //swal(numero.substr(contador,1));
            multiplicacao = ( numero.substr(contador,1) * peso );
            if (multiplicacao >= 10) {multiplicacao = 1 + (multiplicacao-10);}
            soma = soma + multiplicacao;
            //swal(numero.substr(contador,1)+' * '+peso+' = '+multiplicacao + ' =>' + soma) ;
            //swal(soma);
            if (peso == 2) {
                peso = 1;
            } else {
                peso = 2;
            }
            contador = contador - 1;
        }
        var digito = 10 - (soma % 10);
        //swal(numero + '\n10 - (' + soma + ' % 10) = ' + digito);
        if (digito == 10) digito = 0;
        return digito;
    }

    function debug(txt)
    {
        form.t.value = form.t.value + txt + '\n';
    }
    function modulo11_banco(numero)
    {

        numero = numero.replace(/[^0-9]/g,'');
        //debug('Barra: '+numero);
        var soma  = 0;
        var peso  = 2;
        var base  = 9;
        var resto = 0;
        var contador = numero.length - 1;
        //debug('tamanho:'+contador);
        // var numero = "12345678909";
        for (var i=contador; i >= 0; i--) {
            //swal( peso );
            soma = soma + ( numero.substring(i,i+1) * peso);
            //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
            if (peso < base) {
                peso++;
            } else {
                peso = 2;
            }
        }
        var digito = 11 - (soma % 11);
        //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
        if (digito >  9) digito = 0;
        /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
        if (digito == 0) digito = 1;
        return digito;
    }

        $(document).ready(function() {

            $('select').select2();

            $("#barra").focus();

            $('.datepicker').datetimepicker({
                defaultDate: new Date(),
                format: 'DD/MM/YYYY'
            });

            $("#data_fim").val("22/09/2016");

            $( "#validade_isencao" ).blur(function() {
                var qt_dias = $("#validade_isencao").val()

                if (qt_dias == 999)
                    $("#data_fim").val("");

                return swal(qt_dias);


                var tt = '22/09/2016';

                var date = new Date(tt);
                var newdate = new Date(date);

                newdate.setDate(newdate.getDate() + qt_dias);

                var dd = newdate.getDate();
                var mm = newdate.getMonth() + 1;
                var y = newdate.getFullYear();
                var newDate = mm + '/' + dd + '/' + y;



                $("#data_fim").val("");


            });


            $('.datatables').DataTable( {
                "pageLength": 20,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
                ]
            } );

            $( "#interface_schema" ).change(function() {
                $("#interface_schema option:selected").val();
                var ic_tipo_registro = 0
                var ic_posicao_tipo_registro = 0
                var option_selected = $("#interface_schema option:selected").val();
                switch(option_selected) {
                    case 'COB0_TAGFD533.schema':
                        ic_tipo_registro = 1
                        break;
                    case 'DOC0_TAGFD530.schema':
                        ic_tipo_registro = 1
                        break;
                    case 'ATV0_TAGFD315.schema':
                        ic_tipo_registro = 5
                        break;
                    case 'JVR0_TAGFDJVR_TP_1.schema':
                        ic_tipo_registro = 1
                        break;
                    case 'CBE0_TAGFD532.schema':
                        ic_tipo_registro = 2
                        break;
                    case 'CET_TAGFD320.schema':
                        ic_tipo_registro = 1
                        break;
                    case 'GMC0_TAGFD245.schema':
                        ic_tipo_registro = 5
                        break;
                    case 'DMF0_TAGFD235.schema':
                        ic_tipo_registro = 2
                        break;
                    case 'DM10_TAGFD236.schema':
                        ic_tipo_registro = 2
                        break;
                    case 'AFG0_TAGFD494.schema':
                        ic_tipo_registro = 754
                        ic_posicao_tipo_registro = 4
                        break;
                    case 'NOR_TAGFDNOR.schema':
                        ic_tipo_registro = 0
                        break;
                    case 'MEL_TAGFD492.schema':
                        ic_tipo_registro = 0
                        break;
                    default:
                        ic_tipo_registro = 0
                        ic_posicao_tipo_registro = 0
                }

                $("#ic_tipo_registro").val(ic_tipo_registro);
                $("#ic_posicao_tipo_registro").val(ic_posicao_tipo_registro);
            });
        } );
