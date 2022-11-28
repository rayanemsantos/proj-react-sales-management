import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export default {
    formatDatePtBr(date, stringFormat) {
        return format(date, stringFormat, { locale: ptBR });
    },
    formatDate(date, pattern='yyyy-MM-dd') {
        return format(date, pattern);
    },
};
