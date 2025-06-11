
import React, { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, GraduationCap, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Program {
  id: string;
  name: string;
  field: string;
  duration: string;
  type: 'Bachelor' | 'Master' | 'PhD';
  requirements: string[];
  careerPaths: string[];
  averageSalary: string;
}

interface University {
  id: string;
  name: string;
  location: string;
  type: 'local' | 'international';
  ranking: number;
  rating: number;
  tuitionFee: {
    local: number;
    international: number;
  };
  programs: Program[];
  scholarships: boolean;
  image: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [budgetRange, setBudgetRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const fields = [
    'Engineering', 'Computer Science', 'Medicine', 'Business', 'Arts', 
    'Sciences', 'Law', 'Education', 'Agriculture', 'Psychology'
  ];

  const universities: University[] = [
    {
      id: '1',
      name: 'LUMS',
      location: 'Lahore, Pakistan',
      type: 'local',
      ranking: 1,
      rating: 4.8,
      tuitionFee: { local: 800000, international: 1200000 },
      programs: [
        {
          id: 'cs1',
          name: 'Computer Science',
          field: 'Computer Science',
          duration: '4 years',
          type: 'Bachelor',
          requirements: ['FSc Pre-Engineering/ICS', 'SAT Score 1200+'],
          careerPaths: ['Software Engineer', 'Data Scientist', 'AI Engineer'],
          averageSalary: 'PKR 80,000 - 150,000/month'
        }
      ],
      scholarships: true,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'FAST NUCES',
      location: 'Karachi, Pakistan',
      type: 'local',
      ranking: 2,
      rating: 4.6,
      tuitionFee: { local: 600000, international: 900000 },
      programs: [
        {
          id: 'eng1',
          name: 'Software Engineering',
          field: 'Engineering',
          duration: '4 years',
          type: 'Bachelor',
          requirements: ['FSc Pre-Engineering', 'FAST Entry Test'],
          careerPaths: ['Software Developer', 'System Architect', 'Tech Lead'],
          averageSalary: 'PKR 70,000 - 140,000/month'
        }
      ],
      scholarships: true,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'MIT',
      location: 'Massachusetts, USA',
      type: 'international',
      ranking: 1,
      rating: 4.9,
      tuitionFee: { local: 5500000, international: 5500000 },
      programs: [
        {
          id: 'cs2',
          name: 'Computer Science & Engineering',
          field: 'Computer Science',
          duration: '4 years',
          type: 'Bachelor',
          requirements: ['SAT 1500+', 'TOEFL 100+', 'Strong Math Background'],
          careerPaths: ['Research Scientist', 'Tech Entrepreneur', 'AI Researcher'],
          averageSalary: '$120,000 - $200,000/year'
        }
      ],
      scholarships: true,
      image: '/placeholder.svg'
    }
  ];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.programs.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesField = !selectedField || uni.programs.some(p => p.field === selectedField);
    const matchesType = !selectedType || uni.programs.some(p => p.type === selectedType);
    const matchesLocation = !selectedLocation || uni.type === selectedLocation;
    const matchesBudget = uni.tuitionFee.local >= budgetRange[0] && uni.tuitionFee.local <= budgetRange[1];
    
    return matchesSearch && matchesField && matchesType && matchesLocation && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DegreeGuide
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Programs</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Universities</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Scholarships</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Career Guide</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Find Your Perfect Degree Program
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the best universities and programs that match your interests, budget, and career goals.
            Make informed decisions about your future with our comprehensive guidance platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for programs, universities, or fields of study..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg rounded-full border-2 border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100">
              Engineering
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100">
              Computer Science
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100">
              Medicine
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100">
              Business
            </Badge>
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      {showFilters && (
        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Filter Your Search</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Field of Study</label>
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map(field => (
                        <SelectItem key={field} value={field}>{field}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Degree Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachelor">Bachelor's</SelectItem>
                      <SelectItem value="Master">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local (Pakistan)</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Budget Range: PKR {budgetRange[0].toLocaleString()} - {budgetRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={6000000}
                    min={0}
                    step={100000}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">
              Found {filteredUniversities.length} Universities
            </h3>
            <Select defaultValue="ranking">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="fees">Fees (Low to High)</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUniversities.map(university => (
              <Card key={university.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={university.image} 
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      university.type === 'local' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  >
                    {university.type === 'local' ? 'Local' : 'International'}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{university.name}</CardTitle>
                      <div className="flex items-center mt-1 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{university.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{university.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">Rank #{university.ranking}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="programs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="programs">Programs</TabsTrigger>
                      <TabsTrigger value="fees">Fees</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="programs" className="mt-4">
                      {university.programs.slice(0, 2).map(program => (
                        <div key={program.id} className="border rounded-lg p-3 mb-3 last:mb-0">
                          <h4 className="font-semibold text-purple-700">{program.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{program.duration} • {program.type}</p>
                          <div className="flex flex-wrap gap-1">
                            {program.careerPaths.slice(0, 2).map(career => (
                              <Badge key={career} variant="outline" className="text-xs">
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="fees" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Local Students:</span>
                          <span className="font-semibold text-green-600">
                            PKR {university.tuitionFee.local.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">International:</span>
                          <span className="font-semibold text-blue-600">
                            PKR {university.tuitionFee.international.toLocaleString()}
                          </span>
                        </div>
                        {university.scholarships && (
                          <Badge className="w-full justify-center bg-yellow-100 text-yellow-800">
                            Scholarships Available
                          </Badge>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose DegreeGuide?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Smart Search</h4>
              <p className="text-gray-600">Advanced filtering system to find programs that match your exact requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Cost Comparison</h4>
              <p className="text-gray-600">Compare fees across universities and find scholarship opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Career Guidance</h4>
              <p className="text-gray-600">Explore career paths and salary expectations for each program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">DegreeGuide</span>
              </div>
              <p className="text-gray-400">Helping students make informed decisions about their educational future.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Programs</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Engineering</a></li>
                <li><a href="#" className="hover:text-white">Computer Science</a></li>
                <li><a href="#" className="hover:text-white">Medicine</a></li>
                <li><a href="#" className="hover:text-white">Business</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Career Guide</a></li>
                <li><a href="#" className="hover:text-white">Scholarships</a></li>
                <li><a href="#" className="hover:text-white">University Rankings</a></li>
                <li><a href="#" className="hover:text-white">Admission Tips</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>support@degreeguide.com</li>
                <li>+92 300 1234567</li>
                <li>Lahore, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DegreeGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
