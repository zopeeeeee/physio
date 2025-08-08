"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { User, UserCheck, Minus, Plus, Activity } from 'lucide-react'
import { gsap } from "gsap"
import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";

<Header />
interface BMIResult {
  bmi: number
  category: string
  description: string
  color: string
}

interface CalorieResult {
  calories: number
  goal: string
  description: string
}

export default function BMICalorieCalculator() {
  // BMI Calculator State
  const [bmiForm, setBmiForm] = useState({
    name: "",
    dateOfBirth: "",
    gender: "male",
    height: 172,
    weight: 50
  })
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null)

  // Calorie Calculator State
  const [calorieForm, setCalorieForm] = useState({
    name: "",
    sex: "male",
    goal: "maintain",
    activityLevel: "moderate",
    height: 172,
    weight: 70
  })
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(null)

  // Animation refs
  const bmiFormRef = useRef<HTMLDivElement>(null)
  const bmiResultRef = useRef<HTMLDivElement>(null)
  const calorieFormRef = useRef<HTMLDivElement>(null)
  const calorieResultRef = useRef<HTMLDivElement>(null)
  const bmiContainerRef = useRef<HTMLDivElement>(null)
  const calorieContainerRef = useRef<HTMLDivElement>(null)

  const calculateBMI = () => {
    if (!bmiForm.name || !bmiForm.dateOfBirth) return

    const heightInMeters = bmiForm.height / 100
    const bmi = bmiForm.weight / (heightInMeters * heightInMeters)
    
    let category = ""
    let description = ""
    let color = ""

    if (bmi < 18.5) {
      category = "Underweight"
      description = "Being underweight may indicate insufficient body fat and muscle mass, which can lead to weakened immune function, nutrient deficiencies, and decreased energy levels. It's important for individuals in this weight class to focus on consuming a balanced diet to promote healthy weight gain and muscle development."
      color = "text-blue-600"
    } else if (bmi < 25) {
      category = "Normal Weight"
      description = "A normal BMI indicates a healthy weight range that is associated with the lowest risk of heart disease and other health problems. Maintain your current lifestyle with regular exercise and balanced nutrition."
      color = "text-green-600"
    } else if (bmi < 30) {
      category = "Overweight"
      description = "Being overweight may increase your risk of cardiovascular disease, diabetes, and other health conditions. Consider lifestyle changes including regular exercise and dietary modifications for better health."
      color = "text-yellow-600"
    } else {
      category = "Obese"
      description = "Obesity significantly increases the risk of serious health conditions including heart disease, diabetes, and stroke. It's recommended to consult with healthcare professionals for a comprehensive weight management plan."
      color = "text-red-600"
    }

    const result: BMIResult = {
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      color
    }

    setBmiResult(result)

    // Complex animation sequence
    setTimeout(() => {
      if (bmiContainerRef.current && bmiFormRef.current && bmiResultRef.current) {
        // Change container to grid layout
        gsap.set(bmiContainerRef.current, { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' })
        
        // Animate form to left with 3D effect
        gsap.fromTo(bmiFormRef.current, 
          { x: 0, rotationY: 0, scale: 1 },
          { 
            x: 0, 
            rotationY: -5, 
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "right center"
          }
        )
        
        // Animate result from right with 3D pop-out effect
        gsap.fromTo(bmiResultRef.current, 
          { 
            x: 100, 
            opacity: 0, 
            scale: 0.8, 
            rotationY: 15,
            z: -100
          },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1, 
            rotationY: 0,
            z: 0,
            duration: 1.2, 
            ease: "back.out(1.7)",
            transformOrigin: "left center"
          }
        )

        // Add floating animation to result
        gsap.to(bmiResultRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2
        })
      }
    }, 100)
  }

  const calculateCalories = () => {
    if (!calorieForm.name) return

    const heightInCm = calorieForm.height
    const weightInKg = calorieForm.weight
    // Since we removed age input, we'll use a default age of 30 for calculation
    const age = 30

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0
    if (calorieForm.sex === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }

    const maintenanceCalories = bmr * activityMultipliers[calorieForm.activityLevel as keyof typeof activityMultipliers]

    let calories = maintenanceCalories
    let description = ""

    switch (calorieForm.goal) {
      case "lose":
        calories = maintenanceCalories - 500
        description = "To lose weight safely, aim for a 500-calorie deficit per day for approximately 1 pound of weight loss per week. Focus on nutrient-dense foods and regular exercise."
        break
      case "gain":
        calories = maintenanceCalories + 500
        description = "To gain weight healthily, aim for a 500-calorie surplus per day for approximately 1 pound of weight gain per week. Include protein-rich foods and strength training."
        break
      default:
        description = "These calories will help you maintain your current weight based on your activity level and metabolism. Continue with balanced nutrition and regular exercise."
    }

    const result: CalorieResult = {
      calories: Math.round(calories),
      goal: calorieForm.goal,
      description
    }

    setCalorieResult(result)

    // Complex animation sequence
    setTimeout(() => {
      if (calorieContainerRef.current && calorieFormRef.current && calorieResultRef.current) {
        // Change container to grid layout
        gsap.set(calorieContainerRef.current, { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' })
        
        // Animate form to left with 3D effect
        gsap.fromTo(calorieFormRef.current, 
          { x: 0, rotationY: 0, scale: 1 },
          { 
            x: 0, 
            rotationY: -5, 
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "right center"
          }
        )
        
        // Animate result from right with 3D pop-out effect
        gsap.fromTo(calorieResultRef.current, 
          { 
            x: 100, 
            opacity: 0, 
            scale: 0.8, 
            rotationY: 15,
            z: -100
          },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1, 
            rotationY: 0,
            z: 0,
            duration: 1.2, 
            ease: "back.out(1.7)",
            transformOrigin: "left center"
          }
        )

        // Add floating animation to result
        gsap.to(calorieResultRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2
        })
      }
    }, 100)
  }

  const updateHeight = (value: number, type: 'bmi' | 'calorie') => {
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, height: Math.max(100, Math.min(250, value)) }))
    } else {
      setCalorieForm(prev => ({ ...prev, height: Math.max(100, Math.min(250, value)) }))
    }
  }

  const updateWeight = (value: number, type: 'bmi' | 'calorie') => {
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, weight: Math.max(30, Math.min(300, value)) }))
    } else {
      setCalorieForm(prev => ({ ...prev, weight: Math.max(30, Math.min(300, value)) }))
    }
  }

  const handleHeightKeyDown = (e: React.KeyboardEvent, type: 'bmi' | 'calorie') => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      updateHeight(type === 'bmi' ? bmiForm.height + 1 : calorieForm.height + 1, type)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      updateHeight(type === 'bmi' ? bmiForm.height - 1 : calorieForm.height - 1, type)
    }
  }

  const handleWeightKeyDown = (e: React.KeyboardEvent, type: 'bmi' | 'calorie') => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      updateWeight(type === 'bmi' ? bmiForm.weight + 1 : calorieForm.weight + 1, type)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      updateWeight(type === 'bmi' ? bmiForm.weight - 1 : calorieForm.weight - 1, type)
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Playfair Display, serif', perspective: '1000px' }}>
      {/* Header at the top */}
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 py-16 w-full">
          {/* {/* Header */}
          <div className="text-center mb-24">
            <h1 className="text-6xl lg:text-8xl font-bold text-black mb-8 mt-20 tracking-tight">
              Health Calculator
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Calculate your Body Mass Index and daily calorie requirements with precision and elegance
            </p>
          </div>

          {/* BMI Calculator Section */}
          <div className="mb-32">
            <div ref={bmiContainerRef} className="flex justify-center">
              {/* BMI Form */}
              <div ref={bmiFormRef} className="w-full max-w-md">
                <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2" 
                     style={{ transformStyle: 'preserve-3d' }}>
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-black mb-4">BMI Calculator</h2>
                    <div className="w-24 h-0.5 bg-black"></div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Your Name</Label>
                      <Input
                        placeholder="Enter your name"
                        value={bmiForm.name}
                        onChange={(e) => setBmiForm(prev => ({ ...prev, name: e.target.value }))}
                        className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 h-14 text-lg focus:border-black focus:ring-black/10 transition-all duration-200 hover:shadow-md"
                      />
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Date of Birth</Label>
                      <Input
                        type="date"
                        value={bmiForm.dateOfBirth}
                        onChange={(e) => setBmiForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="rounded-xl border-gray-300 bg-white text-gray-900 h-14 text-lg focus:border-black focus:ring-black/10 transition-all duration-200 hover:shadow-md"
                      />
                    </div>

                    <div className="space-y-4 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Select Gender</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={bmiForm.gender === "male" ? "default" : "outline"}
                          onClick={() => setBmiForm(prev => ({ ...prev, gender: "male" }))}
                          className={`flex flex-col items-center gap-3 h-24 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                            bmiForm.gender === "male" 
                              ? 'bg-black text-white border-black hover:bg-gray-800 shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          }`}
                        >
                          <User className="w-6 h-6" />
                          <span className="text-base font-medium">Male</span>
                        </Button>
                        <Button
                          type="button"
                          variant={bmiForm.gender === "female" ? "default" : "outline"}
                          onClick={() => setBmiForm(prev => ({ ...prev, gender: "female" }))}
                          className={`flex flex-col items-center gap-3 h-24 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                            bmiForm.gender === "female" 
                              ? 'bg-black text-white border-black hover:bg-gray-800 shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          }`}
                        >
                          <UserCheck className="w-6 h-6" />
                          <span className="text-base font-medium">Female</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Height (cm)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateHeight(bmiForm.height - 1, 'bmi')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <div 
                          className="flex-1 text-center py-4 px-6 bg-white border-2 border-gray-300 rounded-xl font-bold text-3xl text-gray-900 cursor-pointer focus:outline-none focus:border-black transition-all duration-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105"
                          tabIndex={0}
                          onKeyDown={(e) => handleHeightKeyDown(e, 'bmi')}
                        >
                          {bmiForm.height}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateHeight(bmiForm.height + 1, 'bmi')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Weight (kg)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateWeight(bmiForm.weight - 1, 'bmi')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <div 
                          className="flex-1 text-center py-4 px-6 bg-white border-2 border-gray-300 rounded-xl font-bold text-3xl text-gray-900 cursor-pointer focus:outline-none focus:border-black transition-all duration-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105"
                          tabIndex={0}
                          onKeyDown={(e) => handleWeightKeyDown(e, 'bmi')}
                        >
                          {bmiForm.weight}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateWeight(bmiForm.weight + 1, 'bmi')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      onClick={calculateBMI}
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 font-bold text-xl h-16 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                    >
                      Calculate BMI
                    </Button>
                  </div>
                </div>
              </div>

              {/* BMI Result */}
              {bmiResult && (
                <div ref={bmiResultRef} className="w-full max-w-md opacity-0">
                  <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-2xl transform" 
                       style={{ transformStyle: 'preserve-3d' }}>
                    <div className="mb-12">
                      <h2 className="text-4xl font-bold text-black mb-4">BMI Result</h2>
                      <div className="w-24 h-0.5 bg-black"></div>
                    </div>

                    <div className="space-y-8">
                      {/* BMI Result Card */}
                      <Card className="bg-gray-50 border border-gray-200 text-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-3xl font-bold mb-2 text-black">{bmiForm.name}</h3>
                              <p className="text-gray-600 text-lg mb-8">BMI Analysis</p>
                              
                              <div className="mb-8">
                                <div className="text-6xl font-black mb-3 text-black animate-pulse">{bmiResult.bmi}</div>
                                <div className="text-gray-600 text-lg font-medium">BMI Score</div>
                              </div>

                              <div className="flex gap-8 text-base">
                                <div className="text-center transform transition-all duration-300 hover:scale-110">
                                  <div className="font-bold text-2xl text-black">{calculateAge(bmiForm.dateOfBirth)} yrs</div>
                                  <div className="text-gray-600">Age</div>
                                </div>
                                <div className="text-center transform transition-all duration-300 hover:scale-110">
                                  <div className="font-bold text-2xl text-black">{bmiForm.height} cm</div>
                                  <div className="text-gray-600">Height</div>
                                </div>
                                <div className="text-center transform transition-all duration-300 hover:scale-110">
                                  <div className="font-bold text-2xl text-black">{bmiForm.weight} kg</div>
                                  <div className="text-gray-600">Weight</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Human Figure */}
                            <div className="ml-8">
                              <svg width="80" height="160" viewBox="0 0 80 160" className="text-gray-400 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                                <path
                                  d="M40 20 C48 20 55 27 55 35 C55 43 48 50 40 50 C32 50 25 43 25 35 C25 27 32 20 40 20 Z M40 50 L40 110 M40 75 L25 95 M40 75 L55 95 M40 110 L25 150 M40 110 L55 150"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Category Card */}
                      <Card className="bg-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <CardContent className="p-8">
                          <h4 className="text-3xl font-bold mb-4 text-white">
                            {bmiResult.category}
                          </h4>
                          <p className="text-lg font-normal text-gray-300 mb-4">
                            BMI {bmiResult.bmi < 18.5 ? 'less than 18.5' : 
                                  bmiResult.bmi < 25 ? '18.5 - 24.9' :
                                  bmiResult.bmi < 30 ? '25.0 - 29.9' : '30.0 or greater'}
                          </p>
                          <p className="text-gray-200 text-base leading-relaxed">
                            {bmiResult.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calorie Calculator Section */}
          <div className="border-t border-gray-200 pt-32">
            <div ref={calorieContainerRef} className="flex justify-center">
              {/* Calorie Form */}
              <div ref={calorieFormRef} className="w-full max-w-md">
                <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2" 
                     style={{ transformStyle: 'preserve-3d' }}>
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-black mb-4">Calorie Calculator</h2>
                    <div className="w-24 h-0.5 bg-black"></div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Your Name</Label>
                      <Input
                        placeholder="Enter your name"
                        value={calorieForm.name}
                        onChange={(e) => setCalorieForm(prev => ({ ...prev, name: e.target.value }))}
                        className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 h-14 text-lg focus:border-black focus:ring-black/10 transition-all duration-200 hover:shadow-md"
                      />
                    </div>

                    <div className="space-y-4 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Select Sex</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={calorieForm.sex === "male" ? "default" : "outline"}
                          onClick={() => setCalorieForm(prev => ({ ...prev, sex: "male" }))}
                          className={`flex flex-col items-center gap-3 h-24 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                            calorieForm.sex === "male" 
                              ? 'bg-black text-white border-black hover:bg-gray-800 shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          }`}
                        >
                          <User className="w-6 h-6" />
                          <span className="text-base font-medium">Male</span>
                        </Button>
                        <Button
                          type="button"
                          variant={calorieForm.sex === "female" ? "default" : "outline"}
                          onClick={() => setCalorieForm(prev => ({ ...prev, sex: "female" }))}
                          className={`flex flex-col items-center gap-3 h-24 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                            calorieForm.sex === "female" 
                              ? 'bg-black text-white border-black hover:bg-gray-800 shadow-lg' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          }`}
                        >
                          <UserCheck className="w-6 h-6" />
                          <span className="text-base font-medium">Female</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Goal</Label>
                      <Select value={calorieForm.goal} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, goal: value }))}>
                        <SelectTrigger className="rounded-xl border-gray-300 bg-white text-gray-900 h-14 text-lg focus:border-black focus:ring-black/10 transition-all duration-200 hover:shadow-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                          <SelectItem value="lose" className="focus:bg-gray-100 text-lg">Lose Weight</SelectItem>
                          <SelectItem value="maintain" className="focus:bg-gray-100 text-lg">Maintain Weight</SelectItem>
                          <SelectItem value="gain" className="focus:bg-gray-100 text-lg">Gain Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Activity Level</Label>
                      <Select value={calorieForm.activityLevel} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, activityLevel: value }))}>
                        <SelectTrigger className="rounded-xl border-gray-300 bg-white text-gray-900 h-14 text-lg focus:border-black focus:ring-black/10 transition-all duration-200 hover:shadow-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                          <SelectItem value="sedentary" className="focus:bg-gray-100 text-lg">Sedentary</SelectItem>
                          <SelectItem value="light" className="focus:bg-gray-100 text-lg">Light Activity</SelectItem>
                          <SelectItem value="moderate" className="focus:bg-gray-100 text-lg">Moderate Activity</SelectItem>
                          <SelectItem value="active" className="focus:bg-gray-100 text-lg">Active</SelectItem>
                          <SelectItem value="very_active" className="focus:bg-gray-100 text-lg">Very Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3 transform transition-all duration-300 hover:translate-x-2">
                      <Label className="text-gray-800 font-medium text-lg">Height (cm)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateHeight(calorieForm.height - 1, 'calorie')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <div 
                          className="flex-1 text-center py-4 px-6 bg-white border-2 border-gray-300 rounded-xl font-bold text-3xl text-gray-900 cursor-pointer focus:outline-none focus:border-black transition-all duration-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105"
                          tabIndex={0}
                          onKeyDown={(e) => handleHeightKeyDown(e, 'calorie')}
                        >
                          {calorieForm.height}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onMouseDown={() => updateWeight(calorieForm.weight + 1, 'calorie')}
                          className="rounded-full w-14 h-14 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      onClick={calculateCalories}
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-6 font-bold text-xl h-16 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                    >
                      Calculate Calories
                    </Button>
                  </div>
                </div>
              </div>

              {/* Calorie Result */}
              {calorieResult && (
                <div ref={calorieResultRef} className="w-full max-w-md opacity-0">
                  <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-2xl transform" 
                       style={{ transformStyle: 'preserve-3d' }}>
                    <div className="mb-12">
                      <h2 className="text-4xl font-bold text-black mb-4">Calorie Result</h2>
                      <div className="w-24 h-0.5 bg-black"></div>
                    </div>

                    <div className="space-y-8">
                      {/* Calorie Result Card */}
                      <Card className="bg-gray-50 border border-gray-200 text-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-3xl font-bold mb-2 text-black">{calorieForm.name}</h3>
                              <p className="text-gray-600 text-lg mb-8">Daily Calorie Needs</p>
                              
                              <div className="mb-8">
                                <div className="text-6xl font-black mb-3 text-black animate-pulse">{calorieResult.calories}</div>
                                <div className="text-gray-600 text-lg font-medium">Calories/Day</div>
                              </div>

                              <div className="flex gap-8 text-base">
                                <div className="text-center transform transition-all duration-300 hover:scale-110">
                                  <div className="font-bold text-2xl text-black">{calorieForm.height} cm</div>
                                  <div className="text-gray-600">Height</div>
                                </div>
                                <div className="text-center transform transition-all duration-300 hover:scale-110">
                                  <div className="font-bold text-2xl text-black">{calorieForm.weight} kg</div>
                                  <div className="text-gray-600">Weight</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Activity Icon */}
                            <div className="ml-8">
                              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                                <Activity className="w-12 h-12 text-gray-600" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Goal Card */}
                      <Card className="bg-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <CardContent className="p-8">
                          <h4 className="text-3xl font-bold mb-4 text-white">
                            {calorieForm.goal.charAt(0).toUpperCase() + calorieForm.goal.slice(1)} Weight Goal
                          </h4>
                          <p className="text-lg font-medium text-gray-300 mb-4">
                            {calorieForm.activityLevel.replace('_', ' ')} activity level
                          </p>
                          <p className="text-gray-200 text-base leading-relaxed">
                            {calorieResult.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <ContactFooter />
    </div>
  )
}