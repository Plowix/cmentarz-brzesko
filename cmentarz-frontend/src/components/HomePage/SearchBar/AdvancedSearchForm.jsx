function AdvancedSearchForm({formData, errors, handleInputChange, handleKeyDown}){
    return(
        <div className="advanced-search-inputs">
                    <div className="birth-date-inputs">
                        <h3>Data urodzenia</h3>
                        <input
                            type="number"
                            placeholder='Dzień'
                            value={formData.birthDay}
                            onChange={(e) => handleInputChange(e, 'birthDay')}
                            onKeyDown={handleKeyDown}
                            className={errors.birthDay ? 'wrong-input' : ''}
                        />
                        <input
                            type="number"
                            placeholder='Miesiąc'
                            value={formData.birthMonth}
                            onChange={(e) => handleInputChange(e, 'birthMonth')}
                            onKeyDown={handleKeyDown}
                            className={errors.birthMonth ? 'wrong-input' : ''}
                        />
                        <input
                            className={errors.birthYear ? 'wrong-input' : ''}
                            type="number"
                            placeholder='Rok'
                            value={formData.birthYear}
                            onChange={(e) => handleInputChange(e, 'birthYear')}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="death-date-inputs">
                        <h3>Data śmierci</h3>
                        <input
                            type="number"
                            placeholder='Dzień'
                            value={formData.deathDay}
                            onChange={(e) => handleInputChange(e, 'deathDay')}
                            onKeyDown={handleKeyDown}
                            className={errors.deathDay ? 'wrong-input' : ''}
                        />
                        <input
                            type="number"
                            placeholder='Miesiąc'
                            value={formData.deathMonth}
                            onChange={(e) => handleInputChange(e, 'deathMonth')}
                            onKeyDown={handleKeyDown}
                            className={errors.deathMonth ? 'wrong-input' : ''}
                        />
                        <input
                            className={errors.deathYear ? 'wrong-input' : ''}
                            type="number"
                            placeholder='Rok'
                            value={formData.deathYear}
                            onChange={(e) => handleInputChange(e, 'deathYear')}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
    )
}

export default AdvancedSearchForm;