export function isoDateStringForFormatBR(date: string) {
    const dateObj = new Date(date)
    const dateBR = dateObj.toLocaleDateString('pt-BR')
    const timeBR = dateObj.toLocaleTimeString('pt-BR')
    return dateBR + " - " + timeBR
}