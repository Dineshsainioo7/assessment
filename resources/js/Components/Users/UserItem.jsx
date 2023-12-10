const UserItem = ({ item }) => {
    const {
        id,
        name,
        email,
        phone_number,
        description,
        avatar_with_url,
        role,
        created_at,
    } = item;
    return (
        <>
            <tr>
                <td>
                    <img
                        src={avatar_with_url}
                        alt={name}
                        class="rounded"
                        style={{ height: "50px", width: "50px" }}
                    />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone_number}</td>
                <td>{role}</td>
                <td>{description}</td>
                <td>{created_at}</td>
            </tr>
        </>
    );
};

export default UserItem;
