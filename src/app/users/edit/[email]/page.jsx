'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'

function EditUser() {
  const router = useRouter()
  const params = useParams()
  const email = decodeURIComponent(params.email)

  const basicList = ["Engineering Materials", "Engineering Mechanic/Static/Dynamic", "Computer Programming", "Engineering Drawings"]
  const majorList = ["Theory of Structures and Structural Analysis", "Reinforced Concrete Design", "Timber and Steel Design", "Soil Mechanics"]

  const SummarysheetList = ["Engineering Materials", "Engineering Mechanic/Static/Dynamic", "Computer Programming"]
  const SummarizeList = ["Theory of Structures and Structural Analysis", "Reinforced Concrete Design", "Timber and Steel Design", "Soil Mechanics"]

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    university: '',
    firstName: '',
    lastName: '',
    major: '',
    phone: '',
    expire: '',
    basicSubjects: [],
    majorSubjects: [],
    SummarysheetSubjects: [],
    SummarizeSubjects: [],
  })

  const [extendDays, setExtendDays] = useState('')
  const [updatedExpireDate, setUpdatedExpireDate] = useState('')
  const [newExpireDate, setNewExpireDate] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('expire from API:', data.expire)

        setUser(data)
        setForm({
          university: data.university || '',
          firstName: data.firstName,
          lastName: data.lastName,
          major: data.major,
          phone: data.phone || '',
          expire: data.expire || '',
          basicSubjects: data.basicSubjects || [],
          majorSubjects: data.majorSubjects || [],
          SummarysheetSubjects: data.SummarysheetSubjects || [],
          SummarizeSubjects: data.SummarizeSubjects || [],
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [email])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleSubject = (subject, type) => {
    setForm((prev) => {
      const list = prev[type]
      const exists = list.includes(subject)
      return {
        ...prev,
        [type]: exists ? list.filter((item) => item !== subject) : [...list, subject],
      }
    })
  }

  const calculateNewExpireDate = () => {
    if (!form.expire || !extendDays) return;

    let current;

    if (form.expire.includes('/')) {

      const [day, month, year] = form.expire.split('/');
      current = new Date(Number(year), Number(month) - 1, Number(day));
    } else if (form.expire.includes('-')) {

      const [year, month, day] = form.expire.split('-');
      current = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      setUpdatedExpireDate('ไม่สามารถแปลงวันที่ได้');
      return;
    }

    if (isNaN(current)) {
      setUpdatedExpireDate('ไม่สามารถแปลงวันที่ได้');
      return;
    }

    current.setDate(current.getDate() + parseInt(extendDays));

    const thYear = current.getFullYear() + 543;
    const thMonth = current.toLocaleString('th-TH', { month: 'long' });
    const thDay = current.getDate();

    const formatted = `${thDay} ${thMonth} ${thYear}`;

    setUpdatedExpireDate(formatted);
    setNewExpireDate(current.toISOString().split('T')[0]);
    setExtendDays('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const finalForm = {
      ...form,
      expire: newExpireDate || form.expire,
    }

    await fetch(`/api/users/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalForm),
    })
    router.push('/users')
  }

  if (loading) return <div className="p-6">กำลังโหลด...</div>
  if (!user) return <div className="p-6 text-red-500">ไม่พบผู้ใช้</div>

  return (
    <div className="bg-[#f4f5fa] min-h-screen">

      <div className="bg-[#873747] h-[180px] px-6 pt-6 text-white relative">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">☰</div>
          <h1 className="text-xl font-semibold">แก้ไขข้อมูล</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-[-100px] bg-white rounded-xl p-6 shadow-lg z-10 relative"
      >
        <div className="border rounded-lg bg-blue-50 p-4 mb-6">
          <h3 className="font-semibold mb-4">ข้อมูลผู้ใช้</h3>
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1">อีเมล</label>
              <div className="relative">
                <input
                  disabled
                  value={email}
                  className="w-full border rounded p-2 bg-white"
                />
                <LockClosedIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">มหาวิทยาลัย</label>
              <input
                name="university"
                value={form.university || ''}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">ชื่อ</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">นามสกุล</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">สาขา</label>
              <select
                name="major"
                value={form.major}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              >
                <option value="โยธา">โยธา</option>
                <option value="ไฟฟ้ากำลัง">ไฟฟ้ากำลัง</option>
                <option value="เคมี">เคมี</option>
                <option value="สิ่งแวดล้อม">สิ่งแวดล้อม</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">เบอร์โทร</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              />
            </div>
          </div>
        </div>


        <div className="border rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Expiration Date:</h3>
          <p className="mb-2">
            หมดอายุวันที่:{' '}
            {form.expire
              ? (() => {
                let d;
                if (form.expire.includes('/')) {
                  const [day, month, year] = form.expire.split('/');
                  d = new Date(Number(year), Number(month) - 1, Number(day));
                } else if (form.expire.includes('-')) {
                  const [year, month, day] = form.expire.split('-');
                  d = new Date(Number(year), Number(month) - 1, Number(day));
                } else {
                  return 'ไม่สามารถแปลงวันที่ได้';
                }

                if (isNaN(d)) return 'ไม่สามารถแปลงวันที่ได้';

                const dDay = String(d.getDate()).padStart(2, '0');
                const dMonth = String(d.getMonth() + 1).padStart(2, '0');
                const dYear = d.getFullYear() + 543;
                return `${dDay}/${dMonth}/${dYear}`;
              })()
              : '23/05/2566'}
          </p>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              name="extend"
              value={extendDays}
              onChange={(e) => setExtendDays(e.target.value)}
              placeholder="ระบุจำนวนวันต่ออายุ..."
              className="border rounded p-2 w-178"
            />
            <button
              type="button"
              onClick={calculateNewExpireDate}
              className="bg-indigo-400 text-white px-6 py-2 rounded hover:bg-indigo-500 transition"
            >
              ต่ออายุ
            </button>
          </div>

          {updatedExpireDate && (
            <p className="text-green-600 font-medium">
              อัปเดตหมดอายุวันที่: {updatedExpireDate}
            </p>
          )}
        </div>

        <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
              <h3 className="font-semibold mb-2">เฉลยละเอียดพื้นฐาน</h3>
              {basicList.map((item) => {
                const selected = form.basicSubjects.includes(item);
                return (
                  <div key={item} className="flex justify-between bg-gray-100 p-2 rounded mb-2 border">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => toggleSubject(item, 'basicSubjects')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition 
                      ${selected ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
                    >
                      {selected ? '✔️' : '➕'}
                    </button>
                  </div>
                );
              })}

          <div>
            <h3 className="font-semibold mb-2">เฉลยละเอียดสาขา</h3>
            {majorList.map((item) => {
              const selected = form.majorSubjects.includes(item)
              return (
                <div key={item} className="flex justify-between bg-gray-100 p-2 rounded mb-2 border">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => toggleSubject(item, 'majorSubjects')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition 
                    ${selected ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
                  >
                    {selected ? '✔️' : '➕'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
            <h3 className="font-semibold mb-2">ชีทสรุปพื้นฐาน</h3>
            {SummarysheetList.map((item) => {
              const selected = form.SummarysheetSubjects.includes(item)
              return (
                <div key={item} className="flex justify-between bg-gray-100 p-2 rounded mb-2 border">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => toggleSubject(item, 'SummarysheetSubjects')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition 
                    ${selected ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
                  >
                    {selected ? '✔️' : '➕'}
                  </button>
                </div>
              )
            })}

          <div>
            <h3 className="font-semibold mb-2">ชีทสรุปสาขา</h3>
            {SummarizeList.map((item) => {
              const selected = form.SummarizeSubjects.includes(item)
              return (
                <div key={item} className="flex justify-between bg-gray-100 p-2 rounded mb-2 border">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => toggleSubject(item, 'SummarizeSubjects')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition 
                    ${selected ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
                  >
                    {selected ? '✔️' : '➕'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h2 className="text-center font-bold text-base mb-3">แพ็คเกจหลักสูตรวิชอบรม</h2>

          <div className="border border-gray-300 rounded-md px-4 py-3 flex items-center justify-between">
            <div className="text-center w-full">
              <div className="text-sm font-bold text-gray-800">
                ข้อสอบ + เฉลยละเอียด + ชีทสรุป อบรมวิชา 4 วิชา
              </div>
              <div className="text-xs text-gray-500 mt-1">
                เริ่มสอบภ.ท. สัมภาษณ์ได้ครบทั้งทุกวิชา
              </div>
            </div>

            <button
              type="button"
              className={`ml-4 text-xl font-bold ${form.SummarizeSubjects.includes('แพ็คเกจหลักสูตรวิชอบรม')
                ? 'text-purple-500'
                : 'text-gray-400'
                }`}
              onClick={() => toggleSubject('แพ็คเกจหลักสูตรวิชอบรม', 'SummarizeSubjects')}
            >
              {form.SummarizeSubjects.includes('แพ็คเกจหลักสูตรวิชอบรม') ? '✔️' : '➕'}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push('/users')}
            className="bg-white border px-6 py-2 rounded hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-indigo-400 text-white px-6 py-2 rounded hover:bg-indigo-500 transition"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser