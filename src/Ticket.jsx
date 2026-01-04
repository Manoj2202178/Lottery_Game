import TicketNum from './TicketNum.jsx'

export default function Ticket({ticket}){
    return(
        <>
            {ticket.map((num, idx)=>(
                <TicketNum num={num} key={idx}/>
            ))}
        </>
    )
}