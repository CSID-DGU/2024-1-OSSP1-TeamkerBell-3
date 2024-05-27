import React, { useEffect, useState } from "react";
import styles from "./RecruitNumInput.module.css";

const RecruitNumInput = ({ onRoleAndRecruitNumChange }) => {
    const [roles, setRoles] = useState(["기획", "디자인", "프론트엔드", "백엔드"]);
    const [newRole, setNewRole] = useState(""); 
    const [roleANDrecruitNum, setRoleANDRecruitNum] = useState({});

    const handleRemoveRole = (index) => {
        const newRoles = roles.filter((_, idx) => idx !== index);
        setRoles(newRoles);
        const updatedRecruitNums = {...roleANDrecruitNum};
        delete updatedRecruitNums[roles[index]]; // Also remove its recruitment number
        setRoleANDRecruitNum(updatedRecruitNums);
    };

    const handleAddRole = () => {
        if (newRole) { 
            const newRoles = [...roles, newRole];
            setRoles(newRoles);
            setRoleANDRecruitNum(prev => ({...prev, [newRole]: 0})); 
            setNewRole(""); 
        }
    };

    const handleInputAddRole = (e) => {
        setNewRole(e.target.value);
    };

    const handleRecruitNum = (role) => (e) => {
        const num = parseInt(e.target.value, 10) || 0; // 정수로 변환
        setRoleANDRecruitNum(prev => ({...prev, [role]: num}));
    };


    // onRoleAndRecruitNumChange 콜백 호출
    useEffect(() => {
        onRoleAndRecruitNumChange(roleANDrecruitNum);
    }, [roleANDrecruitNum]);

    
    return(
        <div className={styles.container}>
            {roles.map((role, index) => (
                <div key={index} className={styles.roles}>
                    <button onClick={() => handleRemoveRole(index)}>
                        <img src="/MinusSign.png" alt="Remove" />
                    </button>
                    <div className={styles.rolename}>{role}</div>
                    <input 
                        className={styles.recruitnum} 
                        placeholder="모집 인원 입력" 
                        value={roleANDrecruitNum[role] || ''}
                        onChange={handleRecruitNum(role)}
                    />
                </div>
            ))}

            <div className={styles.addrole}>
                <button onClick={handleAddRole}>
                    <img src="/PlusSign.png" alt="Add" />
                </button>
                <input
                    className={styles.recruitrole}
                    type="text"
                    placeholder="모집 분야 입력"
                    value={newRole}
                    onChange={handleInputAddRole}
                />
                
            </div>
        </div>
    );
};

export default RecruitNumInput;
