const DashboardCard = (props) => {
    return (
        <div className="dash-card">
            <h3 className="heading-tertiary dash-card__title">{props.title}</h3>
            <p className="dash-card__content">{props.content}</p>
            <span className='dash-card__badge'>{props.children}</span>
        </div>
    )
}

export default DashboardCard;