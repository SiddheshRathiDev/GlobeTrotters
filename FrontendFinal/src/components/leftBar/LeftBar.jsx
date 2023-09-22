import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Messages from "../../assets/3.png";
import Memories from "../../assets/5.png";
import Trips from "../../assets/map.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {

  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUSerProfilePic = createUrl("/api/ProfilePic/"+currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");

  const navigate = useNavigate();

  const handleClick = () =>
  {
    navigate("/");
  }

  const logoutUser = () => {
    sessionStorage.removeItem('currentUserId')
    sessionStorage.removeItem('currentUserName')
    navigate("/login")

  }
  

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <div className="user" onClick={handleClick}>
            <img

              src={currentUSerProfilePic}
              alt=""
              onClick={handleClick}
            />
            <span>{currentUserName}</span>
          </div> */}
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Trips} alt="" />
            <span>Trips</span>
          </div>
          <div className="item" onClick={logoutUser}>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYYGRgaGBgaGhwaGBocGh0YGBoaHBwcIRwcIS4lHB4rJBweJzgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAAAQcIAgYDBQT/xABIEAABAQYDAwcICgEBBwUAAAABAAIRITFBUQMyYQQHQgUGEmJxofATFCKBkbKz0hckNFJUdIKSseGTY0Ryg6LB0dMjM0NTc//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC3gHQEQZmyO4aXQdWVVPuoIc+BgBW6GM4Olqnbloh636fHsQCXxMCJC6P4q2Q65qKfeQQC6IiTMWQQlF89EGmaqDqyqgnSl1DuGl07MtU7ctEAxgYASN0JfEwIkLoetKiHXNRAfxVsj3RESZiyn3lHZmqgCEovnoghARBmbIOr+rx7UGmWqB1aXQxgYASN1PuqD1stEAl8TAiQuj+KtkPWnRO3NRAfxVsgLpRfPROzNVB1Z1QBCAiDM2Tq0ug0y1U+6ggxgYASN0MZwdLVDrloh636fHsQHviYESF0fxVsnbmop95A8o193+UR7Vv4RBAjEQFdU14bI98ZOpdH8XcganLQIYZovloj3elN9LJLV/cgGxzUKacV0c6E31sjuHvQBYTqUEcsAJ6o58JOrdJ6O70DUZahNeGgR/FaiP4u5AMM0RTRDCBiaFHujN9LI50JvrZA04rpoM1SjuHvRz4SdW6AI5YOnr4iguMtQk9Hd6PfGTqXQNeGyGETEUCP4u5HujN9LIBhOJpomnFQo50JvrZHcPegaDNUoIyga6o7h70nCTu9AFxAVCa8Nke+MnUunW7kA3OWgQwzRfLRHujN9LJLV/cgaHNQppxXRzvRm+tkdw96Cei1fx7ETyXW8e1EEGMTAiQumvFZD1p0T3qIGozVCCEovnonZmqg6v6vHtQBCAiDMppw3QaZap7vj/qgGMDACRuhjOBEtUOuWiHWfCganNQJrxWTtzUTszVQBCIiTPRAHQEQZmy8hvI51N7BswawgDjYrfQZLQeyy4EtNOqRIC5q5ypX6RuU4/W249TD+VBpnThujqHLQrM30i8pud523+3D+VDvF5Tl523+1j5UGmTGcHS1ScTmoFmY7xeU/wAW3+1j5U+kXlOfnbf7WPlQaZ14rIIRESZiyzN9IvKb3+dt/tY+VBvF5T/Ft/tY+VBpkQgIgz0R1OG6zMN4vKf4tv8Aax8qfSLym53nbf7cP5UGmXUOWhQxnACWqzMd4vKbnedt/tY+VDvF5T/Ft/tY+VBpkxiYESF014rLMx3i8p/i2/2sfKn0i8pvf523+1j5UGmZRE6hBCUXz0Vb7qee2NtvlMDHc1i4bIbZbADPTYeGWg0B6IaBLMQ54OkbIHV/V49qABQZalHU4bp2ZaqfdQc+TH3v4Up6Hh6IBDoGJMjZHRdWhSUJvrZHcNLoGgnUoIyg6eqOf6MgK3Seju9ABfEQAmLqCeLhspe+MiKXR/FWyA90TEGQQwnF8tFAhERfSy5bxHQEXz0QdPj0XvavZSBTiuvnhMUe974+Kf8AdfR3DS6Cqt/RHm+zCvlW3/sVIK8N/R+r7MHSxWo39BUeg9+zuk5RI6TsF3/6f0ujuj5Rc92D/l/paBwcrLVeiIepdPdGZNLIM9tbouUQ6GDH/U/pT9EXKL3Owf8AJ/S0HKUX9yAOhMGtkGfPoi5Re52D/k/pQN0XKJLnYP8Ak/paE6tLo58JOrdBntndFyiaYMP9T+kG6LlFz3YP+X+loQl8ZOpdH8VbIM9ndFyi57sH/L/SNbo+URTBj/qf0tCP4q2SWr+5Bns7ouUQXOwf8n9LxHKGxtYOLiYLbulhttsNOLx0mGiyXGoeFrp4ZDnvBqsq88ft+2fmto+K2g9puJZJ23GcXfVmviYavcRlB09VRG4ll+240XfVmviYavcxnB3egAviMtQj68Nke/0pEUuj+KtkEeUH3f4UqfKH7qIA0lVRpw3QdWVU14bIGhy0KHrQsnbloEPW9Xj2IBuc1AmvFZDrmohtxXQcttuf0YtOjouMIRPRe6r6eIqcNkvgHNCB1uV5nn1z0wuT8J4c3jNg+Tw3zp02qhgd8hUgO+efPPA5PYHTe3iN5MNkgNG7RJyM0e46Axd+BzR3p4W14zOz4uD5BpsuYaGJ02WmqMk9EdEmk3ygqO5V5SxdoxW8bGaLTbZeSe4AUAkBRfbm2frezfmMH4jKC3d/RPm+zW8q27s6Co9Xjv6ZPm+zGnlmvU9iH8H2KkGWSS4RJQbAwcrJ4uiIepdajNULjCEGRxOH8LsWGaqAIZY38e1NBlqUHV9fj2oNMtUDThupOsqKNeGyk6yogg9aBomvFQIetOiduahQNRmqEJc8j16J2ZqlcYjJOWND23QfNszABdD1PnKcFlvnj9v2z81tHxW1qpkQ9GQmsq88ft+2fmto+K2g9puJA89xn/hmviYavcxzQt49iojcSR57jP8AwzXxMNXuet6vHsQNTmoE14rJ25qFNOK6Cek1ZE6LV0QQC+IgBMXR/FSyEviYESF0fWtkB7ozBpZDCcXy0R7oiZmEEJRfPRAc6BiTWyARdW6SgIgzNl5Xn3zywuT8F0G8ZsHybD59dp0mAfa5wqQDn1zzwuT8KjWO0P8A08N86dNp0QwD7XOFSM5cq8pYu04rWNjNFptsvaJ7gBQAQAU8q8pYu0YreNjNlvEbLyT3ACgEgBJfwoC/S5t/a9m/MYPxGV+av7eSdqGFj4WK0CRh4jDZAmQw0GiA+sEGp+XOSMHasFrBx2ekw04gPcWSIhpk0I8QXlOQ91exbNjDF6WJitMl7AxCz0WSJEhlkdIg3hovzRvn2MEkYG0xuMP51y1vm2OQwdpcZww3++gs5lp/ogxv3qQKCBEzdVgxvk2IB3kNpd2Yfzrs759iId5DaXDTDf76CzBGUHT1QF8RACl1WTW+fYjPA2mEoYfzqfpo2IkE4G0v/wB3D+dBZj+KlkJdExBkLL87kTlrB2vCZ2jZ2umy08Oc4hoQLLQMQR/1BkQV+iC6IiTMWQCHQMXyNkdw1ugDoCIM9EdSl0Ah/oyN0AfAQdPVHUpdDGcHS1QAXxEAJi6ypzx+37Z+a2j4ra1WS+JgRIXWVOeP2/bPzW0fFbQez3FEDbcZ4f8AVmviYavd7oGL5aKitxDRG24zg/6s18TDV7OdKL56IDnejMmtlDTTvRrfx2rlpsMwEQarhll8Dl+8+D9PFEH26B+93ouPNWLjuUIPoetOin3lBhAxJkbIbcVCgDTNVB1fX49qaDNUrzfPrnUzsGznFd0m2muhhs0abIJeeqHEn1CqD48+ueeFyfhQc3itg+Tw3zMuk1UMDvkKkZz5V5TxdoxWsbGbLbbZeSe4ASAFAJJypynibRitY2M2Wm2i8k0sAKASAEl/CQgIiICIiAiIgIiICIiC7NwjR8jtQBliYZAo8stAnuHsVsDTNVVNuD/9ragJ9PC91tWyIwExMoA6sqp2ZaoIygBPVH14ahA7ctEPWlRNTloEMJxBlogHXNRZU54/b9s/NbR8VtarMIGJoVlTnj9v2z81tHxW0Htdw7/PcZ34Zr4mGr0abAy+vx7VRW4kHz3GcXfVmviYavQsPPowEOl6rIOCyTIei+J0tGkl9Q6XDRSLiAEwo14aBBLmPD0UdJm3d/aIIab6J6M31sunU77L5YeG7UGcXu/pfXThugOf6MnVuvE70ubGJt2yjyIfi4LRbZZ++yQ5pkdaAI7HVXtnUOWhQxnB0tUGPsRgskggggkEEOIImCKFQDQq+d5W70bUGtp2ZkM7QA9tgQGKBUWb1rJUPiMFklkgggkEEOIIgQQZFBwQinRfdlgMxP8AEv7/AO6D5HDID1wvpiYj+xfNAREQEREBERBde4MPwtqEvTwo/pbVsufCTq3VTbgx/wCltT5dPC91tWyYwMAJG6A98ZOpdH8XchjOBEtU14qBAfxdyPdGb+5NRmqEEJRJnogOdCb62WV+dzD+UNs/N7R8VtaoAdARFSss88MR23bYB+K2j4zSD2G4pj69jB7vqzXxMNXtPR3eqJ3FOO3Y3SP+zNfEw1exjODpaoD3+lJ1Lo/i7k1OagTXisgeV6vj2Ip6bVkQQCOGVVPurmcRACeqkNVpZA7ctEPW/T49iPdEyMghhOL5aIHbmoq33lbvRtQa2jZmQNpAe2yIDFA7g26tZG6shzoGJMjZKurdBkTyRZPpAggkEGBBECCJg/wvniNAgAP8fyr43lbvhtQa2jZmQNoZD22RAYwH8N61kaFULiMFkkEEEEgghxBECCDIoOCF/TsOynExGMMEAttssAmQLTQZBOkV8AaFfo83A7a9m/MYPxGUHuWtzG2ieNs37sT/AMaHcxtonjbN+7E+RXrtGMywyW22mQwASS0QGWWREkkwAX5fJvObZMdvyeDtOFiNxcGWgWoVAM3aIKe+hjbXu8tsz/8AexPkT6GNt/8Au2b92J/41fGnFdctMvgINCviaCiGNze2mWNs0J+liQn1NF0xuZ2wxOPs4FSDiF3q6EVerDNoEZtV0C+IgBMXQed5l82GOT9n8ky0W+k1022yHdJpwEBRkOcA+5qvRHrZaKJelw2UvdExBkLIB606J25qIYQMSZaI6lboHZmqg6s6ppUTKMxlB09UAaZarKvPEfX9s/NbR8VtaqBfEQAmLrKnPH7ftn5raPitoPabiHee4z/wzXxMNXuet+nx7FRO4poee4zx/szXxMNXsYTi+WiB25qKfeUOdAzMijqVugn0vDkTybX3v5RBBL4mBEhdD96tkPWnRNeKyAGq1qEEJRfPRNRmqvi02S8M+vx7e1B2G3HoiIMzYrsDhpdc4bAEnOqbetdacN0AxgYAVuq43lbvhtYa2nZ2QztAD2mZDGA/huxrI0Ksc65aIetOiDH2JhlklkgggkEEOIIgQQZFfoc2j9b2b8xg/EZV27w93I2w+X2foMbTxMn0WMUXJEm9a1uvNcyd120sbTh421BhhjCaGIGA0Gmm22CCyPRgGXgEvNHOi8B+5v02lpnZMFgNEMt4x6QFegySAbgEvdcCyo/Y9paw22MRhostsNBpkiYaZLwVdO/hl+z7M6flm3/siqXaZAB9ngeKFBrpiLIFCASe9dO4ZAVXGDlZFHCPqXZ1y0KAYzg6WqPfGRFLoet6vHsTtzUCA/irZRliIvmLKdeKyDSdUAQgIg1soaacHUuuW2uiPRjfxTtXDLL+x8S7x4eg+jJeHGAFdV0YwMHS1Rwc7hoh60qIBL4mBFLrKnPH7ftn5raPitrVZ1zUWVOeP2/bPzW0fFbQe13ENO23GcH/AFZr4mGr2EJRfPRUTuHJ89xnfhmviYavYdX1+PagOd6Mwa2R3DS6DTLUppw3QPJj7yKOixdSgHrTomnFdCHQm+tk6tboPm0SS4QJBeaH+lLDBe8GLnHXxH2qWWIuEHVXQjKDu9BANstQp14bJOMnUQHipZAOuWiHrRNEe6MwaWQwnF/cgaHNQppxVKO4a3Tq1ugqzfuR5vs0P/lbf29BUjiNvdoHK7N/R+r7MHSxWvcVIINg4OVk0cIepdm5y0CqVnfXhB31RtwADvKM2/3VI32YT/sjbreUZ+VBbJ60bePYmhzUKqZnfZhRfsmIf+IzD/lQb7MJ32TEffyrPyoLZ04rrlpqjOaut1VH02YTneaYj7+VZ+Vc4m+rCIH1TEBuMVl/uoLVZZLQeC4O9IGv9TX0EB1RMKqDvswoO2RsAf6jPyp9NuE/7I263lGflQWzqctAh60RRVMN9mE/7I263lGflRnfZhRfsmIf+IzD/lQWydc1Csqc8ft+2fmto+K2rSG+zCd9kxH38qz8qqPlvbRj7Rj44BZGLi4mIGSXkBtpppz6ueg9/uHB89xnfhmviYavYdWF1RG4ll+240XfVmviYavcR0d3oAuMtQmvDZHv9KQFLo/ipZBHSYspTyg+6iA50BEGZsjqcN0HVlVT7qCHUMqFDGcHS1Tty0Q9b9Pj2IE4mBEhdNeKyduain3kECEREmYsghKL56INM1UHVlVAdQSqUdThunZlqnblogr7fFyJjbTsjDWCyWjg4nSLID2iwWSCWRxEQLhQmyz82yQSCHEQIK2EetKigi49KiDHiLYnR0HSTo2A6VUGO0WwwyOEDrePajhQejVBjxFsToi3oqCyOIDo0QY8RbELP3gH0To3A6VEGO0WxOjYDpVQM/dAfVBjtFsQMigHRqnRFvRQU9uS5v4zDeLtWIw0ww1hhhjpB3TJaZaLQB4R0RGRfCRVwmM4Olqh1y0Q9b9Pj2ID3xMxII+vFZO3NRT7yB5Rr7v8op9Lw5EHIL4iAExdH14bI98ZOpdH8XcgPqctAhhOL5aI93pTfSyS1f3IEoGJoU04ro50JvrZHcPegCMBAiZQRlACeqOfCTq3ScZO70B9RlqEfXhsj3+laiP4u5AMImIMtEMIGJMjZHujN9LI50JvrZA04rpoM1SjuHvRz/Rk6t0ARlB09UFxlqEno7vR74ydS6Brw2Ql0TEGQsj+LuR7ozfSyAYQMSZaJpxUKOdCb62R3D3oGgzVKCMoET1R3DaqThJ3egCMRACYumvDZHvjJ1Lo/i7kAl0TloEMJxfLRHujN9LJLV/cgaHNQppxXRzvRm+tkdw96CfJtXRR5LrePaiAYxMDTVNeKyHrTop95BGozVCCGWL56J2ZqoOr+rx7UAWGWpTThug0y1U+6ggxgYChQxzQIlqh1y0Q9adEDU5qBNeKoTtzUTszVQBCUTXRBCAiKlB1Z1QdXLVA04boRQ5aFT7qg65aIBjmg6WviCanNQIet+nx7E7c1EDXisghERNQp95QNM1UAQyxBnomnDUoOrKqdmWqBoctChjmgBLVO3LRD1pUQDGJgaBNeKyHXNRT7yCNRmqEEMsXz0QaZqoOr+rx7UACgy1KOpw3QaZaqfdQR0Gboj2LfyiCcXMPFUOYeKFEQGMx8WTB4vF0RBzh5T4op4fF0RBGJlHii6xZs+LIiA1mHi6M5j4siIGFmPiq5wpNeKKUQBl8XUN5B4upRAxuHxZS3mHi6IgDN4smFmPiqIgjCkVDOUqUQQ1kHi6nFkERBOJmHiqnj8WREEMZioweLxdEQQxkPiyk5R4qiIPiiIg//9k=" alt="" />
            <span>logout</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeftBar;
